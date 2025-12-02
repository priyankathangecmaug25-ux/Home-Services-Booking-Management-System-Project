package com.homeservicebooking.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class UserDTO {

    private Long userId;

    @NotBlank(message = "Name is required")
    @Size(max = 255, message = "Name cannot exceed 255 characters")
    private String name;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @Size(min = 10, max = 15, message = "Phone number must be 10–15 digits")
    private String phone;

    @NotBlank(message = "Password is required")
    @Size(min = 6, max = 20, message = "Password must be 6–20 characters")
    private String password;

    @NotBlank(message = "Address is required")
    private String address;
}
