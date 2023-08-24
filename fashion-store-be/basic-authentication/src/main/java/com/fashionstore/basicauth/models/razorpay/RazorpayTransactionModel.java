package com.fashionstore.basicauth.models.razorpay;

import lombok.Data;

@Data
public class RazorpayTransactionModel {

	private String razorpay_order_id;
	private String razorpay_payment_id;
	private String razorpay_signature;
}
