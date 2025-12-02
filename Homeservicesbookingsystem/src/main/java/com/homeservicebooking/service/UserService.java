package com.homeservicebooking.service;

import java.util.List;

import com.homeservicebooking.dto.ApiResponse;
import com.homeservicebooking.entities.User;

public interface UserService {

    // ---------------------- GET ALL USERS ----------------------
    List<User> getAllUser();

    // ---------------------- ADD USER ----------------------
    ApiResponse addUser(User user);

    // ---------------------- GET USER BY ID ----------------------
    User getDetailsById(Long userId);

    // ---------------------- UPDATE USER ----------------------
    String updateDetails(Long userId, User user);

    // ---------------------- DELETE USER ----------------------
    String deleteDetails(Long userId);

    // Optional: find by email
    User findByEmail(String email);
    User login(String email, String password);

}
