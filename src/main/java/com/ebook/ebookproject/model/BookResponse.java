package com.ebook.ebookproject.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BookResponse {
    private Long id;
    private String title;
    private String isbn;
    private LocalDate publicationDate;
    private int pages;
    private String publisher;
    private String description;
    private String coverImageUrl;
    private BigDecimal rentalPrice;
    private List<AuthorDTO> authors;
    private List<GenreDTO> genres;
}
