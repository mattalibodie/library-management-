package com.ebook.ebookproject.model;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@Builder
@FieldDefaults(level= AccessLevel.PRIVATE)
public class ValidateToken {
    String token;
    boolean valid;
}
