package com.ebook.ebookproject.service;

import com.cloudinary.Cloudinary;
import com.ebook.ebookproject.entity.Book;
import com.ebook.ebookproject.entity.Borrow;
import com.ebook.ebookproject.entity.User;
import com.ebook.ebookproject.exception.AppException;
import com.ebook.ebookproject.exception.ErrorCode;
import com.ebook.ebookproject.model.BorrowDTO;
import com.ebook.ebookproject.repository.BookRepository;
import com.ebook.ebookproject.repository.BorrowRepository;
import com.ebook.ebookproject.repository.UserRepository;
import com.ebook.ebookproject.utils.SecurityUtils;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.net.URL;
import java.net.URLConnection;
import java.time.LocalDate;

@Service
@AllArgsConstructor
public class BorrowService {

    private final BorrowRepository borrowRepository;
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;
    private final BorrowDTO borrowDTO;
    private final Cloudinary cloudinary;

    //    Muon sach
    @Transactional
    public BorrowDTO borrowBook(Long book_id){
        String username = SecurityUtils.getCurrentUsername();
        Book book = bookRepository.findById(book_id).orElseThrow(() -> new AppException(ErrorCode.BOOK_NOTFOUND));
        User user = userRepository.findUserByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOTFOUND));

        BigDecimal rentalFee = book.getRentalPrice();
        if (user.getBalance().compareTo(rentalFee) < 0) {
            throw new AppException(ErrorCode.INSUFFICIENT_BALANCE);
        }
        Borrow borrow = new Borrow();
        modelMapper.map(book, borrow);
        borrow.setUser(user);
        borrow.setRentalFee(rentalFee);
        borrow.setLoanDate(LocalDate.now());
        borrow.setDueDate(LocalDate.now().plusDays(7));
        borrow.setPaid(true);
        borrowRepository.save(borrow);
        return modelMapper.map(borrow, BorrowDTO.class);
    }

    public boolean isBorrowedPaid(Long borrow_id){
        String username = SecurityUtils.getCurrentUsername();
        User user = userRepository.findUserByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOTFOUND));
        Borrow borrow = borrowRepository.findBorrowById(borrow_id).orElseThrow(() -> new AppException(ErrorCode.BORROW_NOTFOUND));

        if(!borrow.getUser().getId().equals(user.getId())){
            throw  new AppException(ErrorCode.UNAUTHORIZED);
        }

        return borrow.isPaid();
    }

    public String getEpubFileUrl(BorrowDTO borrowDTO){
        String username = SecurityUtils.getCurrentUsername();
        Borrow borrow = borrowRepository.findBorrowById(borrowDTO.getId()).orElseThrow(() -> new AppException(ErrorCode.BORROW_NOTFOUND));

        if(borrow.getDueDate().isAfter(LocalDate.now())){
            throw new AppException(ErrorCode.OVERDUE);
        }

        if(!borrow.getUser().getUsername().equals(username)){
            throw  new AppException(ErrorCode.UNAUTHORIZED);
        }
        if(borrow.isPaid()){
            return borrow.getBook().getEpubFileUrl();
        }
        else throw new AppException(ErrorCode.EPUB_PATH_NOTFOUND);

    }

}
