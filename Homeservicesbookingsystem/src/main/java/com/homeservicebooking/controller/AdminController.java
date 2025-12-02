package com.homeservicebooking.controller;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.homeservicebooking.entities.User;
import com.homeservicebooking.security.JwtUtil;
import com.homeservicebooking.service.HomeServicesService;
import com.homeservicebooking.service.PaymentService;
import com.homeservicebooking.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AdminController {

    private final HomeServicesService homeServicesService;
    private final PaymentService paymentService;
    private final UserService userService; // inject UserService
    private final JwtUtil jwtUtil;
    @GetMapping("/services")
    public ResponseEntity<?> getAllHomeServices() {
        return ResponseEntity.ok(homeServicesService.getAllHomeServices());
    }

    @GetMapping("/payments")
    public ResponseEntity<?> getAllPayments() {
        return ResponseEntity.ok(paymentService.getAllPayments());
    }
    

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUser());
    }


    @PostMapping("/login")
    public ResponseEntity<?> loginAdmin(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        User admin = userService.findByEmail(email);

        if (admin == null || !admin.getRole().name().equals("ADMIN")) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Admin not found!");
        }

        if (!admin.getPassword().equals(password)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid password!");
        }

        // Generate JWT
        String token = jwtUtil.generateToken(admin.getEmail(), admin.getRole().name());

        Map<String, Object> adminResponse = new HashMap<>();
        adminResponse.put("userId", admin.getUserId());
        adminResponse.put("name", admin.getName());
        adminResponse.put("email", admin.getEmail());
        adminResponse.put("phone", admin.getPhone());
        adminResponse.put("role", admin.getRole().name());
        adminResponse.put("token", token); 

        return ResponseEntity.ok(adminResponse);
    }


}


