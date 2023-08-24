package com.fashionstore.basicauth.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fashionstore.basicauth.daos.ClothesCategory;

@Repository
public interface ClothesCategoryRepository extends JpaRepository<ClothesCategory, Long>{

}
