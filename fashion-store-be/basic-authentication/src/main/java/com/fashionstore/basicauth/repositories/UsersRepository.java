package com.fashionstore.basicauth.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fashionstore.basicauth.daos.User;


@Repository
public interface UsersRepository extends JpaRepository<User, Long>{
	
	public Optional<List<User>> findByName(String userName);
	public Optional<User> findByUserId(String userName);
 
}
