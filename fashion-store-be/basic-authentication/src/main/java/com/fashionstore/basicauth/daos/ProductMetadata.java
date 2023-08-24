package com.fashionstore.basicauth.daos;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "productmetadata")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProductMetadata {

	private String brand;
	private String careInstructions;
	private String title;
	private String productType;
	private String body;
	private String sizeFit;
	private String completeTheLook;
	private String type;
	private String isInStock;
	private String inventory;
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "category_for", referencedColumnName = "categoryid")
	@JsonManagedReference
	private ClothesCategory clothesCategory;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long metadataid;
	@ManyToMany
	@JoinTable(name = "productmetadata_productdetails", joinColumns = {
			@JoinColumn(name = "metadata_id", referencedColumnName = "metadataid") }, inverseJoinColumns = {
					@JoinColumn(name = "unique_id", referencedColumnName = "unique_id") })
	@JsonManagedReference
	private Set<ProductDetails> productDetails;
}
