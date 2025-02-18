package com.ebook.ebookproject;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;

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