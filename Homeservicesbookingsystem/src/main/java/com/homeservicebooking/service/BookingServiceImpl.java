package com.homeservicebooking.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.homeservicebooking.dto.ApiResponse;
import com.homeservicebooking.entities.Booking;
import com.homeservicebooking.exceptions.ApiException;
import com.homeservicebooking.exceptions.ResourceNotFoundException;
import com.homeservicebooking.repository.BookingRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor   
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;

    // ---------------------- GET ALL BOOKINGS ----------------------
    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    // ---------------------- ADD NEW BOOKING -----------------------
    @Override
    public ApiResponse addBooking(Booking booking) {

        // Check duplicate booking by customer name (same as your logic)
    	if (!bookingRepository.existsByUser_Name(booking.getUser().getName())) {
            booking.setStatus("Pending");  // default status
            Booking saved = bookingRepository.save(booking);

            return new ApiResponse(
                    "New Booking added with ID=" + saved.getBookingId(),
                    "Success"
            );
        }

        throw new ApiException("Duplicate Booking! Customer already booked.");
    }

    // ---------------------- GET BY ID -----------------------------
    @Override
    public Booking getDetailsById(Long bookingId) {
        return bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
    }

    // ---------------------- UPDATE BOOKING ------------------------
    @Override
    public String updateDetails(Long bookingId, Booking booking) {

        Booking details = getDetailsById(bookingId);
        details.setUser(booking.getUser());
        details.setService(booking.getService());
      //  details.setServiceName(booking.getServiceName());
        details.setDate(booking.getDate());
        details.setStatus(booking.getStatus());
        details.setPrice(booking.getPrice());

        return "Booking updated successfully";
    }

    // ---------------------- DELETE BOOKING ------------------------
    @Override
    public String deleteDetails(Long bookingId) {

        if (bookingRepository.existsById(bookingId)) {
            bookingRepository.deleteById(bookingId);
            return "Deleted Booking details....";
        }

        return "Invalid booking id - can't delete details !!!!!!!!!!";
    }
}