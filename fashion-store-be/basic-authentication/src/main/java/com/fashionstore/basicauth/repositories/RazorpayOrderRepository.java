package com.fashionstore.basicauth.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.fashionstore.basicauth.daos.RazorpayTransactionOrder;

public interface RazorpayOrderRepository extends JpaRepository<RazorpayTransactionOrder, String> {	
	
	@Transactional
	@Modifying
	@Query("UPDATE RazorpayTransactionOrder o SET o.status = :status WHERE o.id = :orderid")
	Integer updateStatusByOrder(String orderid, String status);

}
