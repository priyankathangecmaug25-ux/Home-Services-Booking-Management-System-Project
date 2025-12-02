package com.homeservicebooking.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.homeservicebooking.entities.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {

	boolean existsByUser_Email(String email);
	boolean existsByUser_Name(String name);


}