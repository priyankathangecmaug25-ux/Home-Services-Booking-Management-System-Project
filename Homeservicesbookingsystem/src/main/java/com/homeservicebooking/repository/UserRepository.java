package com.homeservicebooking.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.homeservicebooking.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {

    // Check if a user exists by email
	Optional<User> findByEmail(String email);
	boolean existsByEmail(String email);


   
}
