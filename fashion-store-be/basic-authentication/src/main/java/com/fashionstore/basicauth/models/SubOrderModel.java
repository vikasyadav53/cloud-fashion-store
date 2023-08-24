package com.fashionstore.basicauth.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Data;

@Data
@JsonInclude(Include.NON_NULL) 
public class SubOrderModel {
	
	private String productid;
	private Integer quantity;
	private Integer price;
	
}
