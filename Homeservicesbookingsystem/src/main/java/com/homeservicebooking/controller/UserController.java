package com.homeservicebooking.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.homeservicebooking.dto.ApiResponse;
import com.homeservicebooking.entities.User;
import com.homeservicebooking.security.JwtUtil;
import com.homeservicebooking.service.UserService;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;
   // private final PasswordEncoder passwordEncoder;

    public UserController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
       // this.passwordEncoder = passwordEncoder; 
    }

    // ---------------------- GET ALL USERS ----------------------
    // http://localhost:8080/users/profile   (POSTMAN)
    @GetMapping("/profile")
    //@GetMapping
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userService.getAllUser();
        if (users.isEmpty())
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok(users);
    }

    // ---------------------- ADD NEW USER ----------------------
    @PostMapping
    public ResponseEntity<?> addNewUser(@RequestBody User user) {

        if (user.getName() == null || user.getEmail() == null ||
            user.getPassword() == null || user.getPhone() == null ||
            user.getRole() == null) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Name, Email, Password, Phone, and Role are required!");
        }
        System.out.println(user.getRole());
        try {
            ApiResponse response = userService.addUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    // ---------------------- GET USER BY ID ----------------------
    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserDetailsById(@PathVariable Long userId) {
        try {
            User user = userService.getDetailsById(userId);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // ---------------------- UPDATE USER ----------------------
    @PutMapping("/{userId}")
    public ResponseEntity<?> updateUserDetails(@PathVariable Long userId,
                                               @RequestBody User user) {
        try {
            String message = userService.updateDetails(userId, user);
            return ResponseEntity.ok(message);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // ---------------------- DELETE USER ----------------------
    @DeleteMapping("/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId) {
        try {
            String message = userService.deleteDetails(userId);
            return ResponseEntity.ok(message);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        User user = userService.findByEmail(email);

        if (user == null || !user.getRole().name().equals("USER")) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User not found!");
        }
       
      
		// Generate JWT token
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());

        Map<String, Object> userResponse = new HashMap<>();
        userResponse.put("userId", user.getUserId());
        userResponse.put("name", user.getName());
        userResponse.put("email", user.getEmail());
        userResponse.put("phone", user.getPhone());
        userResponse.put("role", user.getRole().name());
        userResponse.put("token", token);   // <-- VERY IMPORTANT

        return ResponseEntity.ok(userResponse);
    }

}