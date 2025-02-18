package com.ebook.ebookproject.model;
//Dùng để upload book
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Component
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@JsonInclude(JsonInclude.Include.NON_NULL)
public class BookRequest {
    private Long id;
    private String title;
    private String isbn;
    private LocalDate publicationDate;
    private int pages;
    private String publisher;
    private String description;
    private MultipartFile coverImageUrl;
    private MultipartFile epubFileUrl;
    private BigDecimal rentalPrice;
    private List<String> authors;
    private List<String> genres;
}

