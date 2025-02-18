package com.ebook.ebookproject.service;


import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@AllArgsConstructor
public class StorageService {
    private final Cloudinary cloudinary;
    public String upload(MultipartFile file) {
        try{
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap("resource_type", "raw"));
            return uploadResult.get("key").toString();
        }catch (IOException e){
            e.printStackTrace();
            return null;
        }
    }
}
