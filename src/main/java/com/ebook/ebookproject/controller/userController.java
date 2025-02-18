package com.ebook.ebookproject.controller;



import com.ebook.ebookproject.entity.User;
import com.ebook.ebookproject.exception.AppException;
import com.ebook.ebookproject.exception.ErrorCode;
import com.ebook.ebookproject.model.ApiResponse;
import com.ebook.ebookproject.model.UserDTO;
import com.ebook.ebookproject.service.UserService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@Slf4j
@RestController
@RequestMapping("/users")
public class userController {
    public userController(UserService userService) {
        this.userService = userService;
    }

    private final UserService userService;


    @PostMapping("/adduser")
    ApiResponse<UserDTO> add(@RequestBody @Valid UserDTO userDTO) {
        userService.create(userDTO);
        return ApiResponse.<UserDTO>builder()
                .code(200)
                .message("Tạo thành công")
                .build()
                ;
    }
    @GetMapping("/showlist")
    ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok().body(userService.findAll());
    }
    @PutMapping("/update")
    ApiResponse<UserDTO> update(@RequestBody UserDTO userDTO) {
        if(userService.findById(userDTO.getId()) == null) {
            throw new AppException(ErrorCode.USER_NOTFOUND);
        }
        userService.update(userDTO);
        return ApiResponse.<UserDTO>builder()
                .code(200)
                .message("Thay đổi thành công")
                .result(userDTO)
                .build();
    }
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    @DeleteMapping("/delete/{id}")
    ApiResponse<String> delete(@PathVariable long id) {
        if(userService.findById(id) == null) {
            throw new AppException(ErrorCode.USER_NOTFOUND);
        }
        return ApiResponse.<String>builder()
                .code(200)
                .message("Xoá thành công")
                .build();
    }
    @GetMapping("/{id}")
    ApiResponse<UserDTO> findById(@PathVariable long id) {
        return ApiResponse.<UserDTO>builder()
                .code(200)
                .result(userService.findById(id))
                .build();
    }

}
