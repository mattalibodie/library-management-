package com.ebook.ebookproject.exception;

import lombok.Getter;

@Getter
public enum ErrorCode {
    USER_EXISTED(4001, "Tên đăng nhập đã tồn tại"),
    INVALID_USERNAME(4002, "Tên đăng nhập không vuợt quá 20 kí tự"),
    INVALID_PASSWORD(4003, "Mật khẩu tối thiểu 5 kí tự"),
    USER_NOTFOUND(4004, "Tên đăng nhập không tồn tại"),
    UNAUTHENTICATED(4005, "Lỗi xác thực"),
    BOOK_NOTFOUND(4006, "Không tìm thấy sách"),
    BOOK_EXISTED(4007, "Lỗi, Sách này đã được thêm vào database"),
    AUTHOR_EXISTED(4008, "Tên tác giả đã tồn tại"),
    AUTHOR_NOTFOUND(4009, "Không tìm thấy tác giả"),
    GENRE_EXISTED(4010, "Lỗi, mục này đã tồn tại"),
    GENRE_NOTFOUND(4011, "Không tìm thấy thể loại cần thêm"),
    IOE_ERROR(4012,"Có lỗi xảy ra, vui lòng kiểm tra lại đầu vào"),
    BORROW_NOTFOUND(4013, "Không tìm thấy phiếu mượn"),
    EPUB_PATH_NOTFOUND(4013, "Không tìm thấy epub"),
    INSUFFICIENT_BALANCE(4014, "Tài khoản không đủ số dư"),
    UNAUTHORIZED(4015, "Không có quyền truy cập" ),
    OVERDUE(4016,"Đã hết hạn mượn sách" ),
    UPLOAD_FAILED(4017, "Không thể upload file");
    private int code;
    private String message;

    ErrorCode(int code, String message) {
        this.code = code;
        this.message = message;

    }



}
