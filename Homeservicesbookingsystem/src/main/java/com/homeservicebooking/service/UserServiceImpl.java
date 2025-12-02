package com.homeservicebooking.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.homeservicebooking.dto.ApiResponse;
import com.homeservicebooking.entities.Role;
import com.homeservicebooking.entities.User;
import com.homeservicebooking.exceptions.ApiException;
import com.homeservicebooking.exceptions.ResourceNotFoundException;
import com.homeservicebooking.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    // ---------------------- GET ALL USERS ----------------------
    @Override
    public List<User> getAllUser() {
        return userRepository.findAll();
    }


    // ---------------------- ADD USER ----------------------
    @Override
    public ApiResponse addUser(User user) {
        // Check for duplicate email
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new ApiException("Duplicate email detected!");
        }

     // Handle role safely
      

        User savedUser = userRepository.save(user);
        return new ApiResponse("New User added with ID=" + savedUser.getUserId(), "Success");
    }


    // ---------------------- GET USER DETAILS BY ID ----------------------
    @Override
    public User getDetailsById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    // ---------------------- UPDATE USER ----------------------
    @Override
    public String updateDetails(Long userId, User user) {
        User details = getDetailsById(userId);

        details.setName(user.getName());
        details.setEmail(user.getEmail());
        details.setPhone(user.getPhone());
        //details.setAddress(user.getAddress());
        details.setPassword(user.getPassword());

        return "User updated successfully";
    }

    // ---------------------- DELETE USER ----------------------
    @Override
    public String deleteDetails(Long userId) {
        if (userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
            return "Deleted user details....";
        }
        return "Invalid user ID - can't delete details !!!!!!!!!!";
    }

    // ---------------------- USER LOGIN ----------------------
    @Override
    public User login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid email or password");
        }

        return user;
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElse(null);
    }

}
