package com.fashionstore.basicauth.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Data;

@Data
@JsonInclude(Include.NON_NULL) 
public class OrderModel {

	private String status;
	private String paymentid;
	private String userid;
	private List<SubOrderModel> subordermodels;

}
