package com.ebook.ebookproject.service;

import com.ebook.ebookproject.entity.User;
import com.ebook.ebookproject.exception.AppException;
import com.ebook.ebookproject.exception.ErrorCode;
import com.ebook.ebookproject.model.UserDTO;
import com.ebook.ebookproject.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    private ModelMapper modelMapper = new ModelMapper();

    @Override
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public User create(UserDTO userDTO) {
        User user = new User();

        if(userRepository.existsUserByUsername(userDTO.getUsername())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        modelMapper.map(userDTO, user);

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        userRepository.save(user);
        return user;
    }

    @Override
    public void update(UserDTO userDTO) {
        modelMapper.map(userDTO, User.class);
    }


    @Override
    public List<UserDTO> findAll() {
        List<User> users = userRepository.findAll();
        modelMapper.map(users, UserDTO.class);
        List<UserDTO> userDTOs = new ArrayList<>();
        for (User user : users) {
            UserDTO userDTO = modelMapper.map(user, UserDTO.class);
            userDTOs.add(userDTO);
        }
        return userDTOs;
    }

    @Override
    public UserDTO findById(Long id) {
        Optional<User> user = userRepository.findById(id);
        return modelMapper.map(user, UserDTO.class);
    }

}
