package com.fashionstore.basicauth.models.razorpay;

import lombok.Data;

@Data
public class RazorpayOrderManagClient {

	private Integer amount;
	private String currency;
	private String receipt;
	
}
