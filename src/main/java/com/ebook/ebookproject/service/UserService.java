package com.ebook.ebookproject.service;

import com.ebook.ebookproject.entity.User;
import com.ebook.ebookproject.model.UserDTO;


import java.math.BigDecimal;
import java.util.List;

public interface UserService {

    void deleteById(Long id);
    UserDTO create(UserDTO userDTO);
    UserDTO update(Long id, UserDTO userDTO);
    List<UserDTO> findAll();
    UserDTO findById(Long id);
    UserDTO getCurrentUser();
    String getRoleByUserId(Long id);
    void updateBalance(Long userId, BigDecimal balance);
}

