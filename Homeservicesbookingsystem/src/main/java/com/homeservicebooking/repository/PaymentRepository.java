package com.homeservicebooking.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.homeservicebooking.entities.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {

    // Derived query (optional, same pattern as Booking)
    boolean existsByPaymentMethod(String paymentMethod);
}