package com.ebook.ebookproject.service;

import com.ebook.ebookproject.entity.User;
import com.ebook.ebookproject.model.UserDTO;
import com.ebook.ebookproject.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

public interface UserService {

    void deleteById(Long id);
    User create(UserDTO userDTO);
    void update(UserDTO userDTO);
    List<UserDTO> findAll();
    UserDTO findById(Long id);

}

