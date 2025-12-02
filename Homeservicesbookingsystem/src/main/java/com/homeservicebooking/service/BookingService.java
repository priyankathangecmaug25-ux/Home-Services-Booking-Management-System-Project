package com.homeservicebooking.service;

import java.util.List;

import com.homeservicebooking.dto.ApiResponse;
import com.homeservicebooking.entities.Booking;

public interface BookingService {

    List<Booking> getAllBookings();

    ApiResponse addBooking(Booking booking);

    Booking getDetailsById(Long bookingId);

    String updateDetails(Long bookingId, Booking booking);

    String deleteDetails(Long bookingId);
}