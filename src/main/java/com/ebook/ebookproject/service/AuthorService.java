package com.ebook.ebookproject.service;

import com.ebook.ebookproject.entity.Author;
import com.ebook.ebookproject.exception.AppException;
import com.ebook.ebookproject.exception.ErrorCode;
import com.ebook.ebookproject.model.AuthorDTO;
import com.ebook.ebookproject.repository.AuthorRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AuthorService {
    private AuthorRepository authorRepository;
    private ModelMapper modelMapper;


    public List<AuthorDTO> findAll() {
        List<Author> authors = authorRepository.findAll();
        return authors.stream().map(a -> modelMapper.map(a, AuthorDTO.class)).collect(Collectors.toList());
    }
    public AuthorDTO findById(Long id) {
        return null;
    }
    public AuthorDTO create(AuthorDTO authorDTO) {
        if(authorRepository.existsByName(authorDTO.getName())) {
            throw new AppException(ErrorCode.AUTHOR_EXISTED);
        }
        Author author = modelMapper.map(authorDTO, Author.class);
        authorRepository.save(author);
        return modelMapper.map(author, AuthorDTO.class);

    }
    public AuthorDTO update(AuthorDTO authorDTO) {
        Author author = authorRepository.findById(authorDTO.getId()).orElseThrow(() -> new AppException(ErrorCode.AUTHOR_NOTFOUND));
        modelMapper.map(authorDTO, Author.class);
        authorRepository.save(author);
        return modelMapper.map(author, AuthorDTO.class);
    }
    public void delete(Long id) {
        Author author = authorRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.AUTHOR_NOTFOUND));
        authorRepository.delete(author);
    }
}
