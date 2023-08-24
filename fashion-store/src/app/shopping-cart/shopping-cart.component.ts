import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingcartProductDetails } from '../models/shoppingcart-product-details.model';
import { ImageLoaderService } from '../services/imageloader.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  public shoppingCart : Array<ShoppingcartProductDetails>;
  public baseimage64 : Array<string>;

  constructor(private imageloader : ImageLoaderService,
    private router: Router) { 
    this.shoppingCart = new Array();
    this.baseimage64 = new Array();
  }

  ngOnInit(): void {
    let temp = localStorage.getItem("shopping-cart") || "";
    if (temp == null || temp.toString().trim() == "") {
      this.shoppingCart = new Array<ShoppingcartProductDetails>();
    } else {
      this.shoppingCart = JSON.parse(temp) as Array<ShoppingcartProductDetails>;
    }
    this.shoppingCart.forEach(e => {
      this.imageloader.getBase64ImageFromURL(e.imageUrl as string).subscribe((baseimage64data : string) => {
        let base64Image = 'data:image/jpg;base64,' + baseimage64data;
        this.baseimage64.push(base64Image);
      });
    })
    
  }

  public updateCartDeleteProd(shoppingCart: ShoppingcartProductDetails) {
    let index = this.shoppingCart.findIndex(e => shoppingCart.productId == e.productId);
    this.shoppingCart.splice(index, 1);
    this.baseimage64.splice(index);
    localStorage.setItem("shopping-cart", JSON.stringify(this.shoppingCart));
  }

  public cartPrice() : string {
    let totalPrice = 0;
    this.shoppingCart.forEach(e => {
      totalPrice = (e.price!*e.quantity!) + totalPrice;
    });
    return totalPrice.toString();
  }

  public totalProductPrice(product : ShoppingcartProductDetails) : string {
    return (product.price!*product.quantity!).toString();
  }

  public checkOut() {
    this.router.navigate(["check-out"]);
  }

}
