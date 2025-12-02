package com.homeservicebooking.service;

import java.util.List;
import com.homeservicebooking.entities.Payment;

public interface PaymentService {

    Payment addPayment(Payment payment);

    List<Payment> getAllPayments();

    Payment getPaymentById(int id);
    
   // List<Payment> getPaymentsByUserId(Long userId);

    Payment updatePayment(int id, Payment payment);

    String deletePayment(int id);
}
