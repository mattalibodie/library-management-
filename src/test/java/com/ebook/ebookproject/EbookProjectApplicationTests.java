package com.ebook.ebookproject;

import com.ebook.ebookproject.entity.Author;
import com.ebook.ebookproject.model.AuthorDTO;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@Slf4j
@SpringBootTest
class EbookProjectApplicationTests {

	@Test
	void contextLoads() {
	}

	@Test
	void test(){
		String author = "Action\\nAdventure";
		List<String> authorNameList = Arrays.asList(author.split("\r?\n"));
		log.info("authorNameList: {}", authorNameList);
	}
}