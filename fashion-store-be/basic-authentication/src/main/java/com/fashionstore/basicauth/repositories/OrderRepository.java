package com.fashionstore.basicauth.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fashionstore.basicauth.daos.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

}
