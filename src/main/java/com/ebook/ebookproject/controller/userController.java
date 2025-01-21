package com.ebook.ebookproject.controller;



import com.ebook.ebookproject.model.ApiResponse;
import com.ebook.ebookproject.model.UserDTO;
import com.ebook.ebookproject.service.UserService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/users")
public class userController {
    @Autowired
    private UserService userService;

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
    ResponseEntity<List<UserDTO>> showlist() {
        return ResponseEntity.ok().body(userService.findAll());
    }
    @PutMapping("/update")
    ResponseEntity<UserDTO> update(@RequestBody UserDTO userDTO) {
        userService.update(userDTO);
        return ResponseEntity.ok().body(userDTO);
    }
    @DeleteMapping
    ResponseEntity<String> delete(@RequestBody UserDTO userDTO) {
        userService.deleteById(userDTO.getId());
        return ResponseEntity.ok().body("User deleted successfully");
    }
}
