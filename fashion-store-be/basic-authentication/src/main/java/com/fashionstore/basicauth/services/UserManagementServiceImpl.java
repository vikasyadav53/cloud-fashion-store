package com.fashionstore.basicauth.services;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.fashionstore.basicauth.daos.Customer;
import com.fashionstore.basicauth.daos.Role;
import com.fashionstore.basicauth.daos.User;
import com.fashionstore.basicauth.exceptions.UserAlreadyRegistered;
import com.fashionstore.basicauth.models.CustomerDetails;
import com.fashionstore.basicauth.repositories.CustomerRepository;
import com.fashionstore.basicauth.repositories.UsersRepository;

@Service
public class UserManagementServiceImpl implements UserManagementService {

	@Autowired
	UsersRepository userRepository;
	@Autowired
	CustomerRepository customerRepository;
	
	@Autowired(required = false)
	BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Override
	public Long saveUser(User user) {
		Optional<User> userO = userRepository.findByUserId(user.getUserId());
		if(!userO.isPresent()) {
			//Vikas temp comment. Need to uncommet, once spring security is enabled
			String encodedPwd = bCryptPasswordEncoder.encode(user.getPassword());
			user.setPassword(encodedPwd);
			if (user.getRoles() == null ) {
				Role defaultRole = new Role();
				defaultRole.setId(1L);
				defaultRole.setName("USER");
				Set<Role> defaultRoleList = new HashSet<>();
				defaultRoleList.add(defaultRole);
				user.setRoles(defaultRoleList);
			}
			return userRepository.save(user).getId();
		}
		throw new UserAlreadyRegistered();
	}

	@Override
	public Long saveCustomerDetails(CustomerDetails user) {
		Optional<User> userO = userRepository.findByUserId(user.getUserId());
		if(!userO.isPresent()) {
			String encodedPwd = bCryptPasswordEncoder.encode(user.getPassword());
			user.setPassword(encodedPwd);
			//save customer 
			prepareAndSaveUser(user);
			//save user
			return prepareAndSaveCustomer(user);
		}
		throw new UserAlreadyRegistered();
	}

	private Long prepareAndSaveUser(CustomerDetails cuser) {
		User user = new User();
		user.setUserId(cuser.getUserId());
		user.setName(new StringBuilder(cuser.getFirstName()).append(" ").append(cuser.getLastName()).toString());
		user.setPassword(cuser.getPassword());
		if (user.getRoles() == null ) {
			Role defaultRole = new Role();
			defaultRole.setId(1L);
			defaultRole.setName("USER");
			Set<Role> defaultRoleList = new HashSet<>();
			defaultRoleList.add(defaultRole);
			user.setRoles(defaultRoleList);
		}
		return userRepository.save(user).getId();
		
	}

	private Long prepareAndSaveCustomer(CustomerDetails user) {
		Customer customer = new Customer();
		customer.setUserId(user.getUserId());
		customer.setFirstName(user.getFirstName());
		customer.setLastName(user.getLastName());
		customer.setCompanyName(user.getCompanyName());
		customer.setCountry(user.getCountry());
		customer.setStreetAddress(user.getStreetAddress());
		customer.setZipCode(user.getZipCode());
		customer.setEmailAddress(user.getEmailAddress());
		customer.setPhone(user.getPhone());
		customer.setCity(user.getCity());
		
		return customerRepository.save(customer).getId();
	}
	
	public CustomerDetails getCustomerDetailsByUserId(String userId) {
		Optional<User> userO = userRepository.findByUserId(userId);
		CustomerDetails customerDetails = null;
		if(userO.isPresent()) {
			User user = userO.get();
			customerDetails = new CustomerDetails();
			// get details from user table 
			customerDetails.setUserId(userId);
			//customerDetails.setPassword(user.getPassword());
		}
		Optional<Customer> customerO = customerRepository.findByUserId(userId);
		if(customerO.isPresent() && customerDetails != null) {
			Customer customer = customerO.get();
			customerDetails.setFirstName(customer.getFirstName());
			customerDetails.setLastName(customer.getLastName());
			customerDetails.setCompanyName(customer.getCompanyName());
			customerDetails.setCountry(customer.getCountry());
			customerDetails.setStreetAddress(customer.getStreetAddress());
			customerDetails.setZipCode(customer.getZipCode());
			customerDetails.setCity(customer.getCity());
			customerDetails.setEmailAddress(customer.getEmailAddress());
			customerDetails.setPhone(customer.getPhone());
			return customerDetails;
		}
		throw new UserAlreadyRegistered();
	}

}
