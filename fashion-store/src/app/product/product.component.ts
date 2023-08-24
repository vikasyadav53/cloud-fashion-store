import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ProductMetadata } from '../models/product-metadata.model';
import { SelectedProductFDetails } from '../models/selected-product-f-details.model';
import { ShoppingcartProductDetails } from '../models/shoppingcart-product-details.model';
import { EcommerceService } from '../services/ecommerce.service';
import { ImageLoaderService } from '../services/imageloader.service';
import { WindowRefService } from '../window-ref.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [WindowRefService]
})
export class ProductComponent implements OnInit {

  public selectedProduct : ProductMetadata;
  public selectedProductF : SelectedProductFDetails;

  constructor(private activatedRoute : ActivatedRoute,
    private ecommerceService : EcommerceService,
    private imageloaderService: ImageLoaderService,
    private router : Router) {
      this.selectedProduct = new ProductMetadata();
      this.selectedProductF = new SelectedProductFDetails();
  }

  ngOnInit(): void {
    let metadataid : string;
    this.activatedRoute.params.subscribe(params => metadataid = params['metadataid']);
    console.log(history.state.eventV)
    this.ecommerceService.loadProductDetailsByMetadataId(metadataid!).subscribe({
      next: data => {
        this.selectedProduct = <ProductMetadata>data;
        console.log(this.selectedProduct);
        this.populateSelectedProductModel(this.selectedProduct);
      }
    })
  }

  

  private populateSelectedProductModel(productDetails : ProductMetadata)  {
    this.selectedProductF.brandName = productDetails.brand;
    this.selectedProductF.images = new Array();
    this.selectedProductF.imageUrls = new Array();
    //let imagesurl = new Array<string>();
    productDetails.productDetails?.at(0)?.imagesurl?.split("|").forEach(e => {
      e.trim();
      this.selectedProductF.imageUrls?.push(e);
      //imagesurl.push(e);
      this.imageloaderService.getBase64ImageFromURL(e).subscribe((base64data: string) => {    
        //console.log(base64data);
        // this is the image as dataUrl
        let base64Image = 'data:image/jpg;base64,' + base64data;
        this.selectedProductF.images?.push(base64Image);
      });
    });
    this.selectedProductF.productDetails = productDetails.productDetails?.at(0)?.productDetails;
    this.selectedProductF.title = productDetails.title;
    this.selectedProductF.types = productDetails.type;
    this.selectedProductF.productId = productDetails.productDetails?.at(0)?.productId!.toString();
    this.selectedProductF.productType = productDetails.productType;
  }

  public addToCart(event: any) {
    if (event instanceof SelectedProductFDetails) {
      let shoppingcartProductDetails = new ShoppingcartProductDetails();
      shoppingcartProductDetails.imageUrl = this.selectedProductF.imageUrls?.at(0);
      shoppingcartProductDetails.price = 60;
      shoppingcartProductDetails.productId = event.productId;
      shoppingcartProductDetails.productName = event.title;
      shoppingcartProductDetails.quantity = 4;
      shoppingcartProductDetails.productType = this.selectedProductF.productType;
      let temp = localStorage.getItem("shopping-cart") || "";
      let shoppingcart : any ;
      if (temp == null || temp.toString().trim() == "") {
        shoppingcart = new Array<ShoppingcartProductDetails>();
      } else {
        shoppingcart = JSON.parse(temp) as Array<ShoppingcartProductDetails>;
      }
      shoppingcart.push(shoppingcartProductDetails);
      localStorage.setItem("shopping-cart", JSON.stringify(shoppingcart));
      this.router.navigate(['shopping-cart']);
    } else {
      console.log("Event is not proper shopping cart event. Please check below for event object");
    }    
    console.log(event);
  }

}
