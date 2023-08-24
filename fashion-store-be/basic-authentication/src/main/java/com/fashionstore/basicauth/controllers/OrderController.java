package com.fashionstore.basicauth.controllers;

import java.util.ArrayList;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fashionstore.basicauth.daos.Customer;
import com.fashionstore.basicauth.daos.Order;
import com.fashionstore.basicauth.daos.RazorpayTransaction;
import com.fashionstore.basicauth.daos.SubOrder;
import com.fashionstore.basicauth.models.OrderModel;
import com.fashionstore.basicauth.repositories.CustomerRepository;
import com.fashionstore.basicauth.repositories.OrderRepository;
import com.fashionstore.basicauth.repositories.RazorpayTransactionRepository;

@RestController
public class OrderController {
	
	@Autowired
	private OrderRepository orderRepository;
	@Autowired
	private RazorpayTransactionRepository razorpayTransactionRepository;
	@Autowired
	private CustomerRepository customerRepository;
	
	@PostMapping("/place-order")
	public String placeOrder(@RequestBody() OrderModel orderm) {
		prepareOrderEntity(orderm);
		return "Success";
	}
	
	private void prepareOrderEntity(OrderModel orderm) {
		
		Optional<Customer> customerO = customerRepository.findByUserId(orderm.getUserid());
		if(customerO.isEmpty()) {
			throw new NullPointerException("User id not found ");
		}
		
		Optional<RazorpayTransaction> razorpayTransactionO = razorpayTransactionRepository.findById(orderm.getPaymentid());
		if(razorpayTransactionO.isEmpty()) {
			throw new NullPointerException("Payment id not found ");
		}
		
		Order order = new Order() ;
		if (order.getSuborders() == null) {
			order.setSuborders(new ArrayList<>());			
		}
		order.setStatus("CREATED");		
		order.setPaymentid(orderm.getPaymentid());
		order.setUserid(orderm.getUserid());
		
		ArrayList<SubOrder> subOrderList = (ArrayList<SubOrder>)orderm.getSubordermodels().stream().map(e -> {
			SubOrder temp = new SubOrder();
			temp.setPrice(e.getPrice());
			temp.setProductid(e.getProductid());
			temp.setQuantity(e.getQuantity());
			temp.setOrder(order);
			return temp;
		}).collect(Collectors.toList());
		
		order.getSuborders().addAll(subOrderList);
		
		orderRepository.save(order);
		
	}
}
