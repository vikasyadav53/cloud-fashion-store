package com.fashionstore.basicauth.services;

import com.fashionstore.basicauth.daos.User;
import com.fashionstore.basicauth.models.CustomerDetails;

public interface UserManagementService {
	
	public Long saveUser(User user);
	
	public Long saveCustomerDetails(CustomerDetails user);
	
	public CustomerDetails getCustomerDetailsByUserId(String userId);

}
