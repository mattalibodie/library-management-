package com.ebook.ebookproject.controller;

import com.ebook.ebookproject.model.*;
import com.ebook.ebookproject.service.AuthorService;
import com.ebook.ebookproject.service.BookService;
import com.ebook.ebookproject.service.GenreService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/management")
@AllArgsConstructor
@PreAuthorize("hasAuthority('SCOPE_ADMIN')")
public class LibraryController {

    private final AuthorService authorService;
    private final GenreService genreService;
    private final BookService bookService;
    private final BookDTO bookDTO;

    @GetMapping("/book/list")
    public ApiResponse<List<BookDTO>> getAllBooks() {
        List<BookDTO> books = bookService.getAllBooksByAdmin();
        return ApiResponse.<List<BookDTO>>builder()
                .code(200)
                .message("Thành công!")
                .result(books)
                .build();
    }


    @PostMapping(value = "/book/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<BookDTO> createBook(@RequestParam("title") String title,
                                           @RequestParam("publisher") String publisher,
                                           @RequestParam("isbn") String isbn,
                                           @RequestParam("pages") int pages,
                                           @RequestParam("publicationDate") String publicationDate,
                                           @RequestParam("description") String description,
                                           @RequestParam(value = "coverImageUrl", required = false) MultipartFile coverImageUrl,
                                           @RequestParam("epubFileUrl") MultipartFile epubFileUrl,
                                           @RequestParam("rentalPrice") BigDecimal rentalPrice,
                                           @RequestParam("authorNames") String authorNames,
                                           @RequestParam("genreNames") String genreNames) {
        BookRequest request = new BookRequest();
        request.setTitle(title);
        request.setPublisher(publisher);
        request.setIsbn(isbn);
        request.setPages(pages);
        request.setPublicationDate(LocalDate.parse(publicationDate));
        request.setDescription(description);
        request.setCoverImageUrl(coverImageUrl);
        request.setEpubFileUrl(epubFileUrl);
        request.setRentalPrice(rentalPrice);

        bookService.createBook(request, authorNames, genreNames);
        return ApiResponse.<BookDTO>builder()
                .code(200)
                .message("Thành công!")
                .build();
    }

    @PutMapping("/book/update")
    public ApiResponse<BookDTO> updateBook(@RequestBody BookDTO bookDTO) {
        return ApiResponse.<BookDTO>builder()
                .code(200)
                .message("Thành công!")
                .result(bookService.updateBook(bookDTO))
                .build();
    }

    @PutMapping("/book/fee/change")
    public ApiResponse<BookDTO> changeBookFee(@RequestBody BookDTO bookDTO) {
        return ApiResponse.<BookDTO>builder()
                .code(200)
                .result(bookService.updateRentalFee(bookDTO))
                .build();
    }

    @DeleteMapping("/book/delete/id={id}")
    public ApiResponse<Object> deleteBook(@PathVariable String id) {
        bookService.deleteBook(Long.valueOf(id));
        return ApiResponse.builder()
                .code(200)
                .message("Đã xoá!!")
                .build();
    }


    @GetMapping("/genres")
    public ApiResponse<List<GenreDTO>> getAllGenres() {
        return ApiResponse.<List<GenreDTO>>builder()
                .code(200)
                .message("Thành công!")
                .result(genreService.findAllGenres())
                .build();
    }

    @PostMapping("/genre/create")
    public ApiResponse<GenreDTO> createGenre(@RequestBody GenreDTO genre) {
        return ApiResponse.<GenreDTO>builder()
                .code(200)
                .message("Tạo thành công!")
                .result(genreService.create(genre))
                .build();
    }

    @PutMapping("/genre/update")
    public ApiResponse<GenreDTO> updateGenre(@RequestBody GenreDTO genre) {
        return ApiResponse.<GenreDTO>builder()
                .code(200)
                .message("Cập nhật thành công!")
                .result(genreService.update(genre))
                .build();
    }
    @DeleteMapping("/genre/delete")
    public ApiResponse<Object> deleteGenre(@RequestBody Long id) {
        genreService.delete(id);
        return ApiResponse.builder()
                .code(200)
                .message("Xoá thành công!")
                .build();
    }

    @GetMapping("/authors")
    public ApiResponse<List<AuthorDTO>> getAllAuthors() {
        return ApiResponse.<List<AuthorDTO>>builder()
                .code(200)
                .message("Thành công!")
                .result(authorService.findAll())
                .build();
    }
    @PostMapping("/author/create")
    public ApiResponse<AuthorDTO> createAuthor(@RequestBody AuthorDTO author) {
        AuthorDTO authorDTO = authorService.create(author);
        return ApiResponse.<AuthorDTO>builder()
                .code(200)
                .message("Cập nhật thành công!")
                .result(authorDTO)
                .build();
    }
    @PutMapping("/author/update")
    public ApiResponse<AuthorDTO> updateAuthor(@RequestBody AuthorDTO author) {
        return ApiResponse.<AuthorDTO>builder()
                .code(200)
                .message("Cập nhật thành công!")
                .result(authorService.update(author))
                .build();
    }
    @DeleteMapping("/author/delete")
    public ApiResponse<Object> deleteAuthor(@RequestBody Long id) {
        authorService.delete(id);
        return ApiResponse.builder()
                .code(200)
                .message("Xoá thành công!")
                .build();
    }

}
