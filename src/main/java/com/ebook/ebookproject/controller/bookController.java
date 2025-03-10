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
    private final BorrowService borrowService;

    @GetMapping("/book/id={book_id}/borrow")
    public ApiResponse<BorrowDTO> borrowBook(@PathVariable Long book_id) {
        return ApiResponse.<BorrowDTO>builder()
                .code(200)
                .message("Tạo thành công")
                .result(borrowService.borrowBook(book_id))
                .build();
    }
    @GetMapping("/book/borrow/{borrow_id}")
    public ApiResponse<Object> isBorrowed(@PathVariable String borrow_id) {
        boolean isPaid = borrowService.isBorrowedPaid(Long.valueOf(borrow_id));
        return ApiResponse.builder()
                .code(200)
                .result(isPaid)
                .build();
    }
    @GetMapping("/book/{book_id}/epub")
    public ApiResponse<Object> getEpubFile(@PathVariable Long book_id, @RequestBody BorrowDTO borrowDTO) {
        String epubFileUrl = borrowService.getEpubFileUrl(borrowDTO);
        return ApiResponse.builder()
                .code(200)
                .message("Thành công")
                .result(epubFileUrl)
                .build()
                ;
    }
    @GetMapping("/book/id={id}")
    public ApiResponse<BookResponse> getBook(@PathVariable String id) {
        return ApiResponse.<BookResponse>builder()
                .code(200)
                .message("Thành công!!!")
                .result(bookService.getBookById(Long.valueOf(id)))
                .build();
    }
    @GetMapping("/list")
    public ApiResponse<List<BookResponse>> getAllBooks() {
        List<BookResponse> books = bookService.getAllBooks();
        return ApiResponse.<List<BookResponse>>builder()
                .code(200)
                .message("Thành công!")
                .result(books)
                .build();
    }


}
