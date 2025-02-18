package com.ebook.ebookproject.model;


import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Component
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@JsonInclude(JsonInclude.Include.NON_NULL)
public class BookDTO {
    private Long id;
    private String title;
    private String isbn;
    private LocalDate publicationDate;
    private int pages;
    private String publisher;
    private String description;
    private String coverImageUrl;
    private String epubFileUrl;
    private BigDecimal rentalPrice;
    private List<AuthorDTO> authors;
    private List<GenreDTO> genres;
}
