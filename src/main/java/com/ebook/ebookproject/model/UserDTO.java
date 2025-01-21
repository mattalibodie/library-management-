package com.ebook.ebookproject.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;


@Component
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor


@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDTO {
    private Long id;
    private String name;
    @Size(max = 20, message = "INVALID_USERNAME")
    private String username;
    @Size(min = 5, message = "INVALID_PASSWORD")
    private String password;
    private String email;
    private LocalDate birthday;
    private List<String> roles;

}
