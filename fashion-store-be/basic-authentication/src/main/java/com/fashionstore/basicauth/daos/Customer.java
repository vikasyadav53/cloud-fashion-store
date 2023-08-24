package com.fashionstore.basicauth.daos;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "customerdetails")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Customer {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	@Column(name = "userid")
	private String userId;
	@Column(name = "firstname")
	private String firstName;
	@Column(name = "lastname")
	private String lastName;
	@Column(name = "companyname")
	private String companyName;
	@Column(name = "country")
	private String country;
	@Column(name = "streetaddress")
	private String streetAddress;
	@Column(name = "zipcode")
	private String zipCode;
	@Column(name = "city")
	private String city;
	@Column(name = "emailaddress")
	private String emailAddress;
	@Column(name = "phone")
	private String phone;
	/*@OneToMany(fetch = FetchType.LAZY, mappedBy="user")
	@JsonBackReference
	private List<Order> orders;*/
	
}
