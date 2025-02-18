package com.ebook.ebookproject.controller;

import com.ebook.ebookproject.model.ApiResponse;
import com.ebook.ebookproject.model.AuthorDTO;
import com.ebook.ebookproject.model.GenreDTO;
import com.ebook.ebookproject.service.AuthorService;
import com.ebook.ebookproject.service.GenreService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/management")
@AllArgsConstructor
@PreAuthorize("hasAuthority('SCOPE_ADMIN')")
public class LibraryController {

    private final AuthorService authorService;
    private final GenreService genreService;

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
