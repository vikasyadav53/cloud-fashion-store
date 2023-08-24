import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { RazorpayPaymentResponse } from '../models/razorpay-payment-response.model';
import { Order } from '../models/order-model';

@Injectable({
  providedIn: 'root',
})
export class EcommerceService {
  private BASE_URL = 'http://localhost:8081/';

  constructor(private http: HttpClient) {}

  public registerUser(user: User): User | null {
    let registeredUser: User | null = null;
    this.http.post(this.BASE_URL + 'login', user).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
    return registeredUser;
  }

  public loadClothesCategory(): Observable<Object> {
    return this.http.get(this.BASE_URL + 'ecommerce/load/clothes/category');
  }

  public loadProductDetails(): Observable<Object> {
    return this.http.get(this.BASE_URL + 'productmetadata/find/all');
  }

  public loadProductDetailsByMetadataId(id: string): Observable<Object> {
    return this.http.get(
      this.BASE_URL + 'productmetadata/find/metadataid/' + id
    );
  }

  public createAndSaveRazorpayOrder(amount : number) {
    let currency = 'INR';
    let receipt = 'receipt_sdfhkj';
    return this.http.post(this.BASE_URL + 'payment/create_order', {amount : amount, currency: currency, receipt : receipt}, { responseType: 'text' });
  }

  public updateRazorpayOrder(order_id: string, status: string) {
    return this.http.put(this.BASE_URL + 'payment/update_order', {order_id : order_id, status : status }, { responseType: 'text' });
  }

  public saveRazorpayTransaction(transaction : RazorpayPaymentResponse) {
    return this.http.post(this.BASE_URL + 'payment/save_transaction', transaction, { responseType: 'text' });
  }

  public placeOrder(order : Order) {
    return this.http.post(this.BASE_URL + 'place-order', order, { responseType: 'text' });
  }
  
}
