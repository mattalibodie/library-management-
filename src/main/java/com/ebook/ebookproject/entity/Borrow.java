package com.ebook.ebookproject.entity;


import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;


@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Borrow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Book book;

    @Column(nullable = false)
    private LocalDate loanDate;

    @Column(nullable = false)
    private LocalDate dueDate;
    private boolean paid;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('BORROWED', 'RETURNED', 'OVERDUE') DEFAULT 'BORROWED'")
    private Status status = Status.BORROWED;

    @Column(precision = 15, scale = 2, columnDefinition = "DECIMAL(15,2) DEFAULT 0.00")
    private BigDecimal rentalFee = BigDecimal.ZERO;

    public enum Status {
        BORROWED,
        RETURNED,
        OVERDUE,
    }

}
