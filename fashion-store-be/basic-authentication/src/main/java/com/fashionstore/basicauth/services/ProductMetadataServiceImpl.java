package com.fashionstore.basicauth.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fashionstore.basicauth.daos.ProductMetadata;
import com.fashionstore.basicauth.repositories.ProductMetadataRepository;

@Service
public class ProductMetadataServiceImpl implements ProductMetadataService {
	
	@Autowired
	private ProductMetadataRepository productMetadataRepository;

	@Override
	public List<ProductMetadata> findAllProductMetadataList() {
		List<ProductMetadata> productMetadataList = productMetadataRepository.findAll();
		return productMetadataList;
	}

	@Override
	public ProductMetadata findProductMetadataListByMetadataId(Long metadataid) {
		return (ProductMetadata)productMetadataRepository.findById(metadataid).get();
	}

}
