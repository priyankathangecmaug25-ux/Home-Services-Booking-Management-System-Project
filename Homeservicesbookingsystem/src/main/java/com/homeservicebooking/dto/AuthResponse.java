package com.homeservicebooking.dto;
//(user id , name , role , message - success)




import com.homeservicebooking.entities.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AuthResponse {
	private Long id;
	private String firstName;
	private String lastName;
	private Role role;
	private String message;
}
