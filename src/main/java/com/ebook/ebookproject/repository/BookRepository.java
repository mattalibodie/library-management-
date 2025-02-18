package com.ebook.ebookproject.repository;

import com.ebook.ebookproject.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    Boolean existsByTitle(String title);
}
