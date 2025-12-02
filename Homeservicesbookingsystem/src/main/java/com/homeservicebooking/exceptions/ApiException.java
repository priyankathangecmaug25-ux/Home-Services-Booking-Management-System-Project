package com.homeservicebooking.exceptions;

public class ApiException extends RuntimeException {
public ApiException(String mesg) {
	super(mesg);
}
}
