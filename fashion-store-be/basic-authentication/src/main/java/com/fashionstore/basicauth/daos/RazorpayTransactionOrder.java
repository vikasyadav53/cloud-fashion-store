package com.fashionstore.basicauth.daos;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="razorpay_order")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RazorpayTransactionOrder {
	public Integer amount;
	public Integer amount_paid;
	@OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
	public Set<Notes> notes;
	public Date created_at;
	public Integer amount_due;
	public String currency;
	public String receipt;
	@Id
	public String id;
	public String entity;
	public String offer_id;
	public String status;
	public Integer attempts;
	
	public void setNotes(Notes note) {
		if (notes == null) {
			notes= new HashSet<>();
		}
		note.setOrder(this);
		notes.add(note);
	}
		
}