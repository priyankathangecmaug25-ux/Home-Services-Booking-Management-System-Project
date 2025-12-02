package com.homeservicebooking.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class HomeServicesDTO {

    private Long serviceId;

    @NotBlank(message = "Service name is required")
    @Size(max = 255, message = "Service name cannot exceed 255 characters")
    private String name;

    @NotBlank(message = "Description is required")
    @Size(max = 5000, message = "Description cannot exceed 5000 characters")
    private String description;

    @NotBlank(message = "Category is required")
    @Size(max = 255, message = "Category cannot exceed 255 characters")
    private String category;

    @NotNull(message = "Price is required")
    @Min(value = 1, message = "Price must be greater than 0")
    private Long price;


    @NotNull(message = "Status is required")
    private Boolean status;
}
