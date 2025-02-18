package com.ebook.ebookproject.config;
import com.ebook.ebookproject.entity.Roles;
import com.ebook.ebookproject.entity.User;
import com.ebook.ebookproject.model.UserDTO;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.Collection;
import java.util.stream.Collectors;

@Configuration
public class MapperConfig {
    @Bean
    public TypeMap<UserDTO, User> userToDtoMapper(ModelMapper modelMapper) {
        return modelMapper.createTypeMap(UserDTO.class, User.class)
                .addMappings(mapper -> mapper.skip(User::setRoles));
    }
    @Bean
    public TypeMap<User, UserDTO> userToUserDTOMapper(ModelMapper modelMapper) {
        return modelMapper.createTypeMap(User.class, UserDTO.class)
                .addMappings(mapper -> {
                    mapper.map(User::getId, UserDTO::setId);
                    mapper.map(User::getUsername, UserDTO::setUsername);
                    mapper.map(User::getBirthday, UserDTO::setBirthday);
                    mapper.map(User::getEmail, UserDTO::setEmail);
                    mapper.using(ctx -> {
                        if (ctx.getSource() == null){
                            return null;
                        }
                        Collection<Roles> roles = (Collection<Roles>) ctx.getSource();
                        return roles.stream().map(Roles::getName).collect(Collectors.toList());
                    }).map(User::getRoles,UserDTO::setRoles);
                });

    }
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
}
