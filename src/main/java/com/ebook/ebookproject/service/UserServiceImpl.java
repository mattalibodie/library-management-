package com.ebook.ebookproject.service;


import com.ebook.ebookproject.entity.Roles;
import com.ebook.ebookproject.entity.User;

import com.ebook.ebookproject.exception.AppException;
import com.ebook.ebookproject.exception.ErrorCode;

import com.ebook.ebookproject.model.UserDTO;
import com.ebook.ebookproject.repository.RoleRepository;
import com.ebook.ebookproject.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;


@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final ModelMapper modelMapper = new ModelMapper();

    private final TypeMap<UserDTO, User> userToDtoMapper;
    private final TypeMap<User, UserDTO> userDTOUserTypeMap;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public UserDTO create(UserDTO userDTO) {

        if(userRepository.existsUserByUsername(userDTO.getUsername())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        User user = userToDtoMapper.map(userDTO);

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));

        HashSet<Roles> roles = new HashSet<>();
        roleRepository.findById("USER").ifPresent(roles::add);
        user.setRoles(roles);
        userRepository.save(user);
        return modelMapper.map(user, UserDTO.class);
    }

    @Override
    public UserDTO update(UserDTO userDTO) {
        User user = userRepository.findById(userDTO.getId()).orElseThrow(() -> new AppException(ErrorCode.USER_NOTFOUND));
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        var roles = roleRepository.findAllById(userDTO.getRoles());
        user.setRoles(new HashSet<>(roles));
        return userDTOUserTypeMap.map(userRepository.save(user));
    }

    @Override
    public List<UserDTO> findAll() {
        List<User> users = userRepository.findAll();
        modelMapper.map(users, UserDTO.class);
        List<UserDTO> userDTOs = new ArrayList<>();
        for (User user : users) {
            UserDTO userDTO = userDTOUserTypeMap.map(user);
            userDTOs.add(userDTO);
        }
        return userDTOs;
    }
    @Override
    public UserDTO findById(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOTFOUND));

        return userDTOUserTypeMap.map(user);
    }
}
