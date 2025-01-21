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
import org.springframework.core.env.PropertyResolver;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.*;
import java.util.stream.Collectors;


@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final ModelMapper modelMapper = new ModelMapper();
    private final PropertyResolver propertyResolver;




    @Override
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public User create(UserDTO userDTO) {

        if(userRepository.existsUserByUsername(userDTO.getUsername())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }


        TypeMap<UserDTO, User> userMapper = this.modelMapper.createTypeMap(UserDTO.class, User.class);
        userMapper.addMappings(mapper -> mapper.skip(User::setRoles));

        User user = userMapper.map(userDTO);

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));

        HashSet<Roles> roles = new HashSet<>();
        roleRepository.findById("USER").ifPresent(roles::add);
        user.setRoles(roles);
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
            UserDTO userDTO = new UserDTO();
            userDTO.setId(user.getId());
            userDTO.setUsername(user.getUsername());
            userDTO.setBirthday(user.getBirthday());
            userDTO.setEmail(user.getEmail());
            HashSet<Roles> roles = new HashSet<>(user.getRoles());
            userDTO.setRoles(roles.stream().map(Roles::getName).collect(Collectors.toList()));
            userDTOs.add(userDTO);
        }
        return userDTOs;
    }
}
