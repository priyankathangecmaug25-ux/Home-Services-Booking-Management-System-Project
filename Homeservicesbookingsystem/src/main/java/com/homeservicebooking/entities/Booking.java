package com.homeservicebooking.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "Bookings")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
public class Booking extends BaseEntity {
	
	
	 @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
	 @Column(name = "booking_id")
	 private Long bookingId;

	 @ManyToOne
     @JoinColumn(name = "user_id", nullable = false)
     private User user;

	 @ManyToOne
	 @JoinColumn(name = "service_id", nullable = false)
	 private HomeServices service;

     @Column(name = "BookingDate", length = 20)
     private String date;

     @Column(name = "BookingStatus", length = 50)
     private String status;

     @Column(name = "Price")
     private long price;
}