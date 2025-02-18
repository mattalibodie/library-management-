package com.ebook.ebookproject.model;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AuthorDTO{
    private Long id;
    private String name;
    List<BookDTO> books;
}