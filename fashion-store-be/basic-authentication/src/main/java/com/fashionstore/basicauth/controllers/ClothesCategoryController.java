package com.fashionstore.basicauth.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fashionstore.basicauth.daos.ClothesCategory;
import com.fashionstore.basicauth.repositories.ClothesCategoryRepository;

@RestController()
public class ClothesCategoryController {
	
	@Autowired
	private ClothesCategoryRepository clothesCategoryRepository;
	
	@GetMapping("ecommerce/load/clothes/category")
	public List<ClothesCategory> getAllClothesCategory() {
		return clothesCategoryRepository.findAll();
	}
	
	@GetMapping("ecommerce/load/clothes/category/{categoryid}")
	public String loadProductsByCategory(@PathVariable (value = "categoryid") String categoryid, @RequestParam(name = "isenable") Boolean isEnable) {
		System.out.println(" categoryid " + categoryid);
		System.out.println(" isEnable " + isEnable);
		
		return "Hello Vikas";
	}
}
