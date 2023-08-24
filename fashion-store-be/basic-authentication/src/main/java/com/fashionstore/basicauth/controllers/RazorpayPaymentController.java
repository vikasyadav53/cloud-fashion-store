package com.fashionstore.basicauth.controllers;

import java.util.Iterator;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fashionstore.basicauth.daos.Notes;
import com.fashionstore.basicauth.daos.RazorpayTransaction;
import com.fashionstore.basicauth.daos.RazorpayTransactionOrder;
import com.fashionstore.basicauth.models.razorpay.RazorpayOrderManagClient;
import com.fashionstore.basicauth.models.razorpay.RazorpayTransactionModel;
import com.fashionstore.basicauth.repositories.RazorpayOrderNotesRepository;
import com.fashionstore.basicauth.repositories.RazorpayOrderRepository;
import com.fashionstore.basicauth.repositories.RazorpayTransactionRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@RestController
public class RazorpayPaymentController {

	@Value("${razorpay.client.key}")
	String key;
	
	@Value("${razorpay.client.secret}")
	String secret;
	
	@Autowired
	RazorpayOrderRepository razorpayOrderRepository;
	@Autowired
	RazorpayTransactionRepository razorpayTransactionRepository;
	@Autowired
	RazorpayOrderNotesRepository razorpayOrderNotesRepository;
	@Autowired
	EntityManager entityManager;
	
	@PostMapping("/payment/create_order")
	@Transactional
	public String createOrderWithRazorpayment(@RequestBody() RazorpayOrderManagClient razorPayOrderClient) throws RazorpayException {
		RazorpayClient razorpayClient = new RazorpayClient(key, secret);
		JSONObject orderRequest = new JSONObject();
		orderRequest.put("amount", razorPayOrderClient.getAmount()*100);
		orderRequest.put("currency", razorPayOrderClient.getCurrency());
		orderRequest.put("receipt", razorPayOrderClient.getReceipt());
		JSONObject notes = new JSONObject();
		notes.put("notes_key_1", "Tea, Earl Grey, Hot");
		notes.put("notes_key_1", "Tea, Earl Grey, Hot");
		orderRequest.put("notes", notes);
		Order order = razorpayClient.orders.create(orderRequest);
		createAndSaveOrder(order);
		return order.get("id");
	}
	
	@PutMapping("/payment/update_order")
	public String updateOrderWithRazorpayment(@RequestBody() RazorpayTransactionOrder razorpayTransactionOrder) throws RazorpayException {
		razorpayOrderRepository.updateStatusByOrder(razorpayTransactionOrder.getId(), razorpayTransactionOrder.getStatus());
		return "Updated";
	}
	
	@PostMapping("/payment/save_transaction")
	public String saveTransaction(@RequestBody() RazorpayTransactionModel razorpayTransactionModel) throws RazorpayException {
		RazorpayTransaction transaction = new RazorpayTransaction();
		transaction.setRazorpayOrderId(razorpayTransactionModel.getRazorpay_order_id());
		transaction.setRazorpayPaymentId(razorpayTransactionModel.getRazorpay_payment_id());
		transaction.setRazorpaySignature(razorpayTransactionModel.getRazorpay_signature());
		razorpayTransactionRepository.save(transaction);
		return razorpayTransactionModel.getRazorpay_payment_id();
	}
	
	
	private void createAndSaveOrder(Order order) {
		RazorpayTransactionOrder orderDetails = new RazorpayTransactionOrder();
		orderDetails.setAmount(order.get("amount"));
		orderDetails.setAmount_due(order.get("amount_due"));
		orderDetails.setAmount_paid(order.get("amount_paid"));
		orderDetails.setAttempts(order.get("attempts"));
		orderDetails.setCreated_at(order.get("created_at"));
		orderDetails.setCurrency(order.get("currency"));
		orderDetails.setId(order.get("id"));		
		orderDetails.setEntity(order.get("entity"));
		//Set<Notes> notesSet = new HashSet<Notes>();		
		JSONObject jsonObject = order.get("notes");
		Iterator<String> setKey = jsonObject.keys();
		while(setKey.hasNext()) {
			Notes note = new Notes();
			note.setNote(jsonObject.getString(setKey.next()));
			//note.setOrder(orderDetails);
			//notesSet.add(note);
			orderDetails.setNotes(note);
		}
		orderDetails.setOffer_id(JSONObject.NULL.equals(order.get("offer_id")) ? null : order.get("offer_id"));
		orderDetails.setReceipt(order.get("receipt"));		
		orderDetails.setStatus(order.get("status"));
		
		/*razorpayOrderRepository.save(orderDetails);
		orderDetails.getNotes().stream().forEach(note -> {
			razorpayOrderNotesRepository.save(note);
		});*/
		
		entityManager.persist(orderDetails);
		
	}

}
