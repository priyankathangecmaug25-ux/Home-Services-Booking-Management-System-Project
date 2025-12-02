package com.homeservicebooking.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.homeservicebooking.entities.HomeServices;
import com.homeservicebooking.entities.Payment;
import com.homeservicebooking.entities.User;
import com.homeservicebooking.repository.HomeServicesRepository;
import com.homeservicebooking.repository.PaymentRepository;
import com.homeservicebooking.repository.UserRepository;

@Service
public class paymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HomeServicesRepository serviceRepository;


    @Override
    public Payment addPayment(Payment payment) {

        // Fetch existing service
        Long serviceId = payment.getService() != null ? payment.getService().getServiceId() : null;
        HomeServices service = serviceRepository.findById(serviceId)
                .orElseThrow(() -> new RuntimeException("Service not found"));
        payment.setService(service);

        // Set payment date if not provided
        if (payment.getPaymentDate() == null) {
            payment.setPaymentDate(LocalDate.now());
        }

        return paymentRepository.save(payment);
    }


    // ---------------------- GET ALL PAYMENTS ----------------
    @Override
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    
    // ---------------------- UPDATE PAYMENT -----------------
    @Override
    public Payment updatePayment(int id, Payment payment) {
        Payment existingPayment = paymentRepository.findById(id).orElse(null);
        if (existingPayment != null) {
        	//payment.setPaymentDate(LocalDate.now());
       existingPayment.setUser(payment.getUser());
        	 existingPayment.setService(payment.getService());
            //existingPayment.setServiceId(payment.getServiceId());
            existingPayment.setAmount(payment.getAmount());
            existingPayment.setPaymentMethod(payment.getPaymentMethod());
            existingPayment.setPaymentDate(payment.getPaymentDate());
            return paymentRepository.save(existingPayment);
        }
        return null; // or throw exception if you prefer
    }

    // ---------------------- DELETE PAYMENT -----------------
    @Override
    public String deletePayment(int id) {
        if (!paymentRepository.existsById(id)) {
            return "Payment not found!";
        }
        paymentRepository.deleteById(id);
        return "Payment deleted successfully!";
    }
    @Override
    public Payment getPaymentById(int id) {
        return paymentRepository.findById(id).orElse(null);
    }
  
}
