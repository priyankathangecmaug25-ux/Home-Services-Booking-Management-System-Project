package com.homeservicebooking.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.homeservicebooking.entities.Booking;
import com.homeservicebooking.service.BookingService;

@RestController
@RequestMapping("/bookings")
@CrossOrigin(origins = "*")
//@CrossOrigin(origins = "http://localhost:5175")
public class BookingController {

    private final BookingService bookingService;

    // Constructor Injection (same style)
    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    // ---------------------- GET ALL BOOKINGS ----------------------
    @GetMapping
    public ResponseEntity<?> getAllBookings() {
        List<Booking> bookings = bookingService.getAllBookings();

        if (bookings.isEmpty())
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        else
            return ResponseEntity.ok(bookings);
    }

    // ---------------------- ADD NEW BOOKING -----------------------
    @PostMapping
    public ResponseEntity<?> addNewBooking(@RequestBody Booking booking) {
        System.out.println("in add " + booking);
        try {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(bookingService.addBooking(booking));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    // ---------------------- GET BY ID -----------------------------
    @GetMapping("/{bookingId}")
    public Booking getBookingDetailsById(@PathVariable Long bookingId) {
        System.out.println("in get details " + bookingId);
        return bookingService.getDetailsById(bookingId);
    }

    // ---------------------- UPDATE BOOKING ------------------------
    @PutMapping("/{bookingId}")
    public String updateBookingDetails(@PathVariable Long bookingId,
                                       @RequestBody Booking booking) {
        return bookingService.updateDetails(bookingId, booking);
    }

    // ---------------------- DELETE BOOKING ------------------------
    @DeleteMapping("/{bookingId}")
    public String deleteBookingDetails(@PathVariable Long bookingId) {
        return bookingService.deleteDetails(bookingId);
    }
}