import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { switchAll } from 'rxjs';
import Swal from 'sweetalert2';
import { Order } from '../models/order-model';
import { RazorpayPaymentResponse } from '../models/razorpay-payment-response.model';
import { ShoppingcartProductDetails } from '../models/shoppingcart-product-details.model';
import { Suborder } from '../models/suborder-model';
import { UserDetails } from '../models/user-details.model';
import { EcommerceService } from '../services/ecommerce.service';
import { WindowRefService } from '../window-ref.service';


@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  billingDetails! : FormGroup;
  submitted : boolean;
  cartList : Array<ShoppingcartProductDetails>;

  constructor(private formBuilder : FormBuilder,
    private router: Router,
    private winRef : WindowRefService,
    private ecommerce : EcommerceService) { 
      this.submitted = false;
      this.cartList = new Array();
    }

  ngOnInit(): void {

    let localStoreS = localStorage.getItem("shopping-cart") || "";
    if (localStoreS == null || localStoreS.toString().trim() == '') {
      console.log("Some thing is wrong. Please relogin and retry !!!");
      sessionStorage.clear();
      this.router.navigate(["login"]);
    } else {
      this.cartList = <Array<ShoppingcartProductDetails>>JSON.parse(localStoreS);
    }

    let userDetailsS = sessionStorage.getItem("user-details") || "";
    let userDetails;
    if (userDetailsS == null || userDetailsS.toString().trim() == "") {
      this.router.navigate(["login"]);
    } else {
      userDetails = <UserDetails>JSON.parse(userDetailsS);
    }

    this.billingDetails = this.formBuilder.group({
      firstName: [userDetails?.firstName || '', Validators.required],
      lastName: [userDetails?.lastName || '', Validators.required],
      companyName: [userDetails?.companyName || '', Validators.required],
      country: [userDetails?.country || '', Validators.required],
      streetAddress: [userDetails?.streetAddress || '', Validators.required],
      zipCode: [userDetails?.zipCode || '', Validators.required],
      city: [userDetails?.city || '', Validators.required],
      email: [userDetails?.emailAddress || '', Validators.required],
      phone: [userDetails?.phone || '', Validators.required],

    });

  }

  get f() { return this.billingDetails.controls; }

  onSubmit() {
    // stop here if form is invalid
    this.submitted = true;
    if (this.billingDetails.invalid) {
        return;
    }
    console.log(this.billingDetails.value);
    this.createAndSaveRazorpayOrder(this.totalAmount()) ;
  }

  onReset() {
    this.submitted = false;
    this.billingDetails.reset();
  }

  totalAmount() : number {
    let total = 0;
    this.cartList.forEach(e => {
      total = (e.quantity!*e.price!) + total;
    })
    return total;
  }

  totalProductPrice(cart : ShoppingcartProductDetails) : number {
    return (cart.price!*cart.quantity!);
  }


  createAndSaveRazorpayOrder(amount : number) {
    let orderId = '';
    this.ecommerce.createAndSaveRazorpayOrder(amount).subscribe({
      next : data => {
        console.log(data);
        orderId = data as string;
        this.payWithRazor(orderId, amount);
      },
      error : err => {
        console.log("Error while creating order with razorpay service " + err );
      }
    });
  }

  payWithRazor(val : any, amount : number) {
    const options: any = {
      key: 'rzp_test_cieBJC1FtSRk5v',
      amount: amount, // amount should be in paise format to display Rs 1255 without decimal point
      currency: 'INR',
      name: 'Fashion Website', // company name or product name
      description: '',  // product description
      image: './assets/bird_2.jpg', // company logo or product image
      order_id: val, // order_id created by you in backend
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },

      notes: {
        // include notes if any
      },
      theme: {
        color: '#0c238a'
      }
    };
    options.handler = ((response : any , error : any ) => {
      options.response = response;
      console.log(response);
      console.log(options);
      // call your backend api to verify payment signature & capture transaction
      //capture transaction 
      let tempTrans = <RazorpayPaymentResponse>response;
      this.ecommerce.saveRazorpayTransaction(tempTrans).subscribe({
        next: data => {
          this.placeOrder(tempTrans.razorpay_payment_id);
          Swal.fire(
            'Successful',
            'Payment transaction completed successfully!',
            'success'
          )
          //alert("Payment transaction completed successfully!");
        },
        error : err => {
          Swal.fire(
            'Error',
            'Payment failed!',
            'error'
          )
          console.log(err);
        }
      });
      //update order status
      this.ecommerce.updateRazorpayOrder(val, "paid").subscribe({
        next: data => {
          console.log("Order has been updated successfully");
        }
      })
    });
    options.modal.ondismiss = (() => {
      // handle the case when user closes the form while transaction is in progress
      console.log('Transaction cancelled.');
    });
    options.failed = () => {
      console.log("Vikas FAILED!!!!");
    }
    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.on('payment.failed', function (response : any){
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp.open();
  }

  placeOrder(val: any) {
      let userObject = sessionStorage.getItem("user-details");
      let user : any;
      if (userObject == undefined || userObject == null) {
        throw new Error ("User is not login. Or login expired");
      } else {
        user = JSON.parse(userObject) as UserDetails;
      }
      //UserDetails
      let cartdetails = localStorage.getItem("shopping-cart");
      let cartProducts: any;
      if (cartdetails == undefined || cartdetails == null) {
        throw new Error ("Cart is empty. Please select items, before placing it.");
      } else {
        cartProducts = JSON.parse(cartdetails) as Array<ShoppingcartProductDetails>;
      }
      let order = new Order();
      order.userid = user.userId;
      cartProducts.forEach((p : ShoppingcartProductDetails) => {
        let t = new Suborder();
        t.price = p.price!;
        t.productid = p.productId!;
        t.quantity = p.quantity!;
        order.subordermodels.push(t);
      });
      order.paymentid = val as string;
      order.status = 'CREATED';

      this.ecommerce.placeOrder(order).subscribe({
        next: data => {
          console.log(data as string);
          if (data as string == 'Success')
            Swal.fire(
              'Successful',
              'Order placed successfully!',
              'success'
            ).then ((result) => {
              this.router.navigate(['home']);
            });
        }
      })

  }

}

