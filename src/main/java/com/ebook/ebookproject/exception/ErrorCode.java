package com.ebook.ebookproject.exception;

import lombok.Getter;

@Getter
public enum ErrorCode {
    USER_EXISTED(4001, "Tên đăng nhập đã tồn tại"),
    INVALID_USERNAME(4002, "Tên đăng nhập không vuợt quá 20 kí tự"),
    INVALID_PASSWORD(4003, "Mật khẩu tối thiểu 5 kí tự"),
    USER_NOTFOUND(4004, "Tên đăng nhập không tồn tại"),
    UNAUTHENTICATED(4005, "Lỗi xác thực")
    ;

    private int code;
    private String message;

    ErrorCode(int code, String message) {
        this.code = code;
        this.message = message;

    }



}
