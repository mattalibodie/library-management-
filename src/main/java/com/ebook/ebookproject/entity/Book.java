package com.ebook.ebookproject.entity;


import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String publisher;
    private String isbn;
    private int pages;
    private LocalDate publicationDate;
    private String description;
    private String coverImageUrl;
    private String epubFileUrl;
    @Column(precision = 15, scale = 2, columnDefinition = "DECIMAL(15,2) DEFAULT 0.00")
    private BigDecimal rentalPrice = BigDecimal.ZERO;
    @ManyToMany
    private List<Author> authors;
    @ManyToMany
    private List<Genre> genres;
}
