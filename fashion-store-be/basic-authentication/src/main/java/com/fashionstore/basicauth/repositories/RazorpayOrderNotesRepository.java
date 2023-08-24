package com.fashionstore.basicauth.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fashionstore.basicauth.daos.Notes;

public interface RazorpayOrderNotesRepository extends JpaRepository<Notes, Long>{

}
