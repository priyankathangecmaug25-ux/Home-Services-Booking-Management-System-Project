package com.homeservicebooking.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.homeservicebooking.entities.Payment;
import com.homeservicebooking.service.PaymentService;

@RestController
@RequestMapping("/payments")
@CrossOrigin(origins = "*")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping
    public ResponseEntity<?> getAllPayments() {
        List<Payment> payments = paymentService.getAllPayments();
        if (payments.isEmpty())
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok(payments);
    }

    @PostMapping
    public ResponseEntity<?> addNewPayment(@RequestBody Payment payment) {
        try {
            Payment created = paymentService.addPayment(payment);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @GetMapping("/{paymentId}")
    public ResponseEntity<?> getPaymentDetailsById(@PathVariable int paymentId) {
        Payment payment = paymentService.getPaymentById(paymentId);
        if (payment == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Payment with id " + paymentId + " not found");
        }
        return ResponseEntity.ok(payment);
    }

    @PutMapping("/{paymentId}")
    public ResponseEntity<?> updatePaymentDetails(@PathVariable int paymentId,
                                                  @RequestBody Payment payment) {
        Payment updated = paymentService.updatePayment(paymentId, payment);
        if (updated == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Payment with id " + paymentId + " not found for update");
        }
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{paymentId}")
    public ResponseEntity<?> deletePaymentDetails(@PathVariable int paymentId) {
        String result = paymentService.deletePayment(paymentId);
        if (result.contains("successfully")) {
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(result);
    }
}
