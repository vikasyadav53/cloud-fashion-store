package com.fashionstore.basicauth.models;

import java.io.Serializable;

import lombok.Data;

@Data
public class CustomerDetails implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String userId;
	private transient String password;
	private String firstName;
	private String lastName;
	private String companyName;
	private String country;
	private String streetAddress;
	private String zipCode;
	private String city;
	private String emailAddress;
	private String phone;

}
