package com.fashionstore.basicauth.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.fashionstore.basicauth.daos.ProductMetadata;
import com.fashionstore.basicauth.services.ProductMetadataService;

@RestController
public class ProductMetadataController {
	
	@Autowired
	private ProductMetadataService productMetadataService;
	
	@GetMapping("productmetadata/find/all")
	public List<ProductMetadata> getAllProductMetadata() {
		return productMetadataService.findAllProductMetadataList();
	}
	
	@GetMapping("productmetadata/find/metadataid/{metadataid}")
	public ProductMetadata getAllProductMetadataByMetadataId(@PathVariable("metadataid") Long metadataid) {
		System.out.println(metadataid);
		return productMetadataService.findProductMetadataListByMetadataId(metadataid);
	}

}
