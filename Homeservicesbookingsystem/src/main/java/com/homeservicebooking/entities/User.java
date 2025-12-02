package com.homeservicebooking.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;



@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(nullable = false)
    private String name;


    @Email
    @Column(unique = true, nullable = false)
    private String email;

    private String phone;
    private String password;

    //private String address;
    
    @Enumerated(EnumType.STRING) // col type - varchar | enum
	private Role role;

//    // USER (1) ---> (M) PAYMENTS
//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//    private List<Payment> payments;
//    
//
//    // USER (1) ---> (M) SERVICES
//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//    private List<HomeServices> services;
}
