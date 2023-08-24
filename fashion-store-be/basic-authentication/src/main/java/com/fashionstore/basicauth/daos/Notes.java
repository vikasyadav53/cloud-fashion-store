package com.fashionstore.basicauth.daos;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="razorpay_order_notes")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Notes{
	@Id
	@GeneratedValue
	public Long uid;
    public String note;
    @ManyToOne(fetch = FetchType.LAZY)
    //@JoinColumn(name = "orderid")
    public RazorpayTransactionOrder order;
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Notes )) return false;
        return uid != null && uid.equals(((Notes) o).getUid());
    }
 
    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
       
    
}
