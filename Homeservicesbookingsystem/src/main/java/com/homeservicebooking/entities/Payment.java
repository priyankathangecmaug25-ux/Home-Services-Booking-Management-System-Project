package com.homeservicebooking.entities;

import jakarta.persistence.*;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "payments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Payment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id")
    private Long paymentId;

    @ManyToOne
    @JoinColumn(name = "service_id", nullable = false)
    private HomeServices service;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private double amount;

    @Column(name = "payment_method", length = 50, nullable = false)
    private String paymentMethod;

    
    @Column(name = "payment_date", nullable = false)
    private LocalDate paymentDate = LocalDate.now();

}
