package com.ebook.ebookproject.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.ebook.ebookproject.entity.Author;
import com.ebook.ebookproject.entity.Book;
import com.ebook.ebookproject.entity.Genre;
import com.ebook.ebookproject.exception.AppException;
import com.ebook.ebookproject.exception.ErrorCode;
import com.ebook.ebookproject.model.BookDTO;
import com.ebook.ebookproject.model.BookRequest;
import com.ebook.ebookproject.model.BookResponse;
import com.ebook.ebookproject.repository.AuthorRepository;
import com.ebook.ebookproject.repository.BookRepository;
import com.ebook.ebookproject.repository.GenreRepository;
import com.ebook.ebookproject.utils.SecurityUtils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@AllArgsConstructor
public class BookService {
    private final BookRepository bookRepository;
    private final ModelMapper modelMapper;
    private final Cloudinary cloudinary;
    private final AuthorRepository authorRepository;
    private final GenreRepository genreRepository;

    public List<BookResponse> getAllBooks() {
        List<Book> books = bookRepository.findAll();
        return books.stream().map(book -> modelMapper.map(book, BookResponse.class)).collect(Collectors.toList());
    }
    public List<BookDTO> getAllBooksByAdmin() {
        List<Book> books = bookRepository.findAll();
        return books.stream().map(book -> modelMapper.map(book, BookDTO.class)).collect(Collectors.toList());
    }

    public BookResponse getBookById(Long id) {
        Book book = bookRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.BOOK_NOTFOUND));
        return modelMapper.map(book, BookResponse.class);
    }

    public void createBook(BookRequest book, String authors, String genres) {
        if(bookRepository.existsByTitle(book.getTitle())) {
            throw new AppException(ErrorCode.BOOK_EXISTED);
        }

        List<String> authorNameList = Arrays.asList(authors.split(","));
        List<String> genreNameList = Arrays.asList(genres.split(","));

        List<Author> author = authorNameList.stream()
                .map(authorName -> authorRepository.findByName(authorName)
                        .orElseThrow(() -> new AppException(ErrorCode.AUTHOR_NOTFOUND))
        ).toList();
        List<Genre> genre = genreNameList.stream()
                .map(genreName -> genreRepository.findByName(genreName)
                        .orElseThrow(() -> new AppException(ErrorCode.GENRE_NOTFOUND))
                ).toList();
        Book newBook = new Book();
        newBook.setTitle(book.getTitle());
        newBook.setPublisher(book.getPublisher());
        newBook.setIsbn(book.getIsbn());
        newBook.setPages(book.getPages());
        newBook.setPublicationDate(book.getPublicationDate());
        newBook.setDescription(book.getDescription());
        newBook.setRentalPrice(book.getRentalPrice());
        newBook.setAuthors(author);
        newBook.setGenres(genre);
        String epubUrl;
        try {
            Map uploadResult = cloudinary.uploader().upload(book.getEpubFileUrl().getBytes(), ObjectUtils.asMap("resource_type", "raw", "format", "epub"));
            epubUrl = (String) uploadResult.get("secure_url");
        } catch (IOException e) {
            throw new AppException(ErrorCode.UPLOAD_FAILED);
        }
        String coverImageUrl = null;
        if (book.getCoverImageUrl() != null && !book.getCoverImageUrl().isEmpty()) {
            try {
                Map uploadResult = cloudinary.uploader().upload(book.getCoverImageUrl().getBytes(), ObjectUtils.emptyMap());
                coverImageUrl = (String) uploadResult.get("secure_url");
            } catch (IOException e) {
                System.err.println("Không thể upload ảnh bìa: " + e.getMessage());
            }
        }

        newBook.setEpubFileUrl(epubUrl);
        newBook.setCoverImageUrl(coverImageUrl);
        bookRepository.save(newBook);
    }

    public BookDTO updateBook(BookDTO bookDTO) {
        Book book = bookRepository.findById(bookDTO.getId()).orElseThrow(() -> new AppException(ErrorCode.BOOK_NOTFOUND));
        modelMapper.map(bookDTO, book);
        bookRepository.save(book);
        return modelMapper.map(book, BookDTO.class);
    }

    public BookDTO updateRentalFee(BookDTO bookDTO) {
        Book book = bookRepository.findById(bookDTO.getId())
                .orElseThrow(() -> new AppException(ErrorCode.BOOK_NOTFOUND));
        book.setRentalPrice(bookDTO.getRentalPrice());
        bookRepository.save(book);
        return modelMapper.map(book, BookDTO.class);
    }

    public void deleteBook(Long id){
        Book book = bookRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.BOOK_NOTFOUND));
        bookRepository.deleteById(id);
        try{
            cloudinary.uploader().destroy(book.getEpubFileUrl(), ObjectUtils.emptyMap());
            cloudinary.uploader().destroy(book.getCoverImageUrl(), ObjectUtils.emptyMap());
        }catch (IOException e){
            throw new AppException(ErrorCode.UPLOAD_FAILED);
        }
    }
}
