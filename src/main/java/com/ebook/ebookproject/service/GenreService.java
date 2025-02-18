package com.ebook.ebookproject.service;


import com.ebook.ebookproject.entity.Genre;
import com.ebook.ebookproject.exception.AppException;
import com.ebook.ebookproject.exception.ErrorCode;
import com.ebook.ebookproject.model.GenreDTO;
import com.ebook.ebookproject.repository.GenreRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class GenreService {
    private final GenreRepository genreRepository;
    private final ModelMapper modelMapper;

    public List<GenreDTO> findAllGenres() {
        List<Genre> genres = genreRepository.findAll();
        return genres.stream().map(g -> modelMapper.map(g, GenreDTO.class)).collect(Collectors.toList());
    }

    public GenreDTO create(GenreDTO genreDTO) {
        if(genreRepository.existsByName(genreDTO.getName())) {
            throw new AppException(ErrorCode.GENRE_EXISTED);
        }
        Genre genre = modelMapper.map(genreDTO, Genre.class);
        return modelMapper.map(genreRepository.save(genre), GenreDTO.class);
    }

    public GenreDTO update(GenreDTO genreDTO) {
        Genre genre = genreRepository.findById(genreDTO.getId()).orElseThrow(() -> new AppException(ErrorCode.GENRE_NOTFOUND));
        modelMapper.map(genreDTO, genre);
        return modelMapper.map(genreRepository.save(genre), GenreDTO.class);
    }

    public void delete(Long id) {
        if(!genreRepository.existsById(id)) {
            throw new AppException(ErrorCode.GENRE_NOTFOUND);
        }
        genreRepository.deleteById(id);
    }

}
