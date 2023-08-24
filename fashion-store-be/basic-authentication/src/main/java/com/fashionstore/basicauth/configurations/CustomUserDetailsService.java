package com.fashionstore.basicauth.configurations;

import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.fashionstore.basicauth.daos.Role;
import com.fashionstore.basicauth.daos.User;
import com.fashionstore.basicauth.repositories.UsersRepository;

@Component
public class CustomUserDetailsService implements UserDetailsService {
	
	@Autowired
	UsersRepository usersRepo;

	@Override
	public UserDetails loadUserByUsername(String userid) throws UsernameNotFoundException {
		Optional<User> userDetailsO = usersRepo.findByUserId(userid);
		if (userDetailsO.isEmpty()) {
			throw new UsernameNotFoundException("User with user id : " + userid + "does not exist");
		}
		User fetchedUser = userDetailsO.get();
		Set<Role> roles = fetchedUser.getRoles();
		fetchedUser.setRoles(roles);
		UserDetails usersDetails = new CustomUserDetails(fetchedUser);
		return usersDetails;
	}

}
