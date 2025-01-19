package com.ebook.ebookproject.model;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
@Component
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long id;
    private String name;
    @Size(max = 20, message = "INVALID_USERNAME")
    private String username;
    @Size(min = 5, message = "INVALID_PASSWORD")
    private String password;
    private String email;
    private LocalDate birthday;
}
