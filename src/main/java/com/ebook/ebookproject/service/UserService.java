package com.ebook.ebookproject.service;

import com.ebook.ebookproject.entity.User;
import com.ebook.ebookproject.model.UserDTO;


import java.util.List;

public interface UserService {

    void deleteById(Long id);
    User create(UserDTO userDTO);
    void update(UserDTO userDTO);
    List<UserDTO> findAll();

}

