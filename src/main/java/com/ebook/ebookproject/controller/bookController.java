package com.ebook.ebookproject.controller;


import com.ebook.ebookproject.model.*;
import com.ebook.ebookproject.repository.BookRepository;
import com.ebook.ebookproject.repository.BorrowRepository;
import com.ebook.ebookproject.service.BookService;
import com.ebook.ebookproject.service.BorrowService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/library")
@AllArgsConstructor
public class bookController {

    private final BookService bookService;
    private final BorrowRepository borrowRepository;
    private final BorrowService borrowService;
    private final BookRepository bookRepository;

    @GetMapping("/book/id={book_id}/borrow")
    public ApiResponse borrowBook(@PathVariable String book_id) {
        return null;
    }
    @GetMapping("/book/{borrow_id}/paid")
    public ApiResponse<Object> isBorrowed(@PathVariable String borrow_id) {
        boolean isPaid = borrowService.isBorrowedPaid(Long.valueOf(borrow_id));
        return ApiResponse.builder()
                .code(200)
                .result(isPaid)
                .build();
    }

    @GetMapping("/book/{book_id}/epub")
    public ApiResponse<Object> getEpubFile(@PathVariable String book_id, @RequestBody BorrowDTO borrowDTO) {
        String epubFileUrlrl = borrowService.getEpubFileUrl(borrowDTO);
        return ApiResponse.builder()
                .code(200)
                .message("Thành công")
                .result(epubFileUrlrl)
                .build()
                ;
    }


    @GetMapping("/book/id={id}")
    public ApiResponse<BookDTO> getBook(@PathVariable String id) {
        return ApiResponse.<BookDTO>builder()
                .code(200)
                .message("Thành công!!!")
                .result(bookService.getBookById(Long.valueOf(id)))
                .build();
    }



    @GetMapping("/list")
    public ApiResponse<List<BookDTO>> getAllBooks() {
        List<BookDTO> books = bookService.getAllBooks();
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
                                           @RequestParam(value = "coverImageUrl", required = false) MultipartFile coverImageUrl, // Cho phép null
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
    @DeleteMapping("/book/delete/id={id}")
    public ApiResponse<Object> deleteBook(@PathVariable String id) {
        bookService.deleteBook(Long.valueOf(id));
        return ApiResponse.builder()
                .code(200)
                .message("Đã xoá!!")
                .build();
    }
}
