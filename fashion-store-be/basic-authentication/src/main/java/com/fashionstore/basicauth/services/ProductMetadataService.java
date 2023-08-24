package com.fashionstore.basicauth.services;

import java.util.List;

import com.fashionstore.basicauth.daos.ProductMetadata;

public interface ProductMetadataService {
	
	public List<ProductMetadata> findAllProductMetadataList();

	public ProductMetadata findProductMetadataListByMetadataId(Long metadataid);

}
