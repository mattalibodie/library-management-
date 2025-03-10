package com.ebook.ebookproject.controller;

import com.cloudinary.Api;
import com.ebook.ebookproject.entity.User;
import com.ebook.ebookproject.exception.AppException;
import com.ebook.ebookproject.exception.ErrorCode;
import com.ebook.ebookproject.model.ApiResponse;
import com.ebook.ebookproject.model.UserDTO;
import com.ebook.ebookproject.service.UserService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Slf4j
@RestController
@RequestMapping("/user")
public class userController {
    public userController(UserService userService) {
        this.userService = userService;
    }

    private final UserService userService;


    @GetMapping("/me")
    ApiResponse<UserDTO> getCurrentUser() {
        return ApiResponse.<UserDTO>builder()
                .code(200)
                .result(userService.getCurrentUser())
                .build();
    }


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


    @Transactional
    @PutMapping("/update/id={id}")
    ApiResponse<UserDTO> update(@PathVariable Long id, @RequestBody UserDTO userDTO) {
        if (userService.findById(id) == null) {
            throw new AppException(ErrorCode.USER_NOTFOUND);
        }
        return ApiResponse.<UserDTO>builder()
                .code(200)
                .message("Thay đổi thành công")
                .result(userService.update(id, userDTO))
                .build();
    }

    @PreAuthorize("hasAnyAuthority('SCOPE_ADMIN')")
    @PostMapping("/update_balance/{id}")
    ApiResponse<String> updateBalance(@PathVariable Long id, @RequestBody UserDTO userDTO) {
        if(userService.findById(id) == null) {
            throw new AppException(ErrorCode.USER_NOTFOUND);
        }
        userService.updateBalance(id, userDTO.getBalance());
        return ApiResponse.<String>builder()
                .code(200)
                .message("Thành công")
                .build();
    }

    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    @DeleteMapping("/delete/{id}")
    ApiResponse<String> delete(@PathVariable String id) {
        if (userService.findById(Long.valueOf(id)) == null) {
            throw new AppException(ErrorCode.USER_NOTFOUND);
        }
        userService.deleteById(Long.valueOf(id));
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

    @GetMapping("/{id}/roles")
    ApiResponse<Object> findRoles(@PathVariable long id) {
        return ApiResponse.builder()
                .code(200)
                .result(userService.getRoleByUserId(id))
                .build();
    }

}
