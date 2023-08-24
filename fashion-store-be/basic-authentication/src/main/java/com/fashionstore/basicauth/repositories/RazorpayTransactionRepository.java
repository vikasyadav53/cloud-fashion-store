package com.fashionstore.basicauth.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fashionstore.basicauth.daos.RazorpayTransaction;

public interface RazorpayTransactionRepository extends JpaRepository<RazorpayTransaction, String>{

}
