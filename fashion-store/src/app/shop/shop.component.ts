import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductFDetails } from '../models/product-f-details.model';
import { ProductMetadata } from '../models/product-metadata.model';
import { EcommerceService } from '../services/ecommerce.service';
import { ImageLoaderService } from '../services/imageloader.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  public base64Image: any;
  public productFDetails : Array<ProductFDetails>;

  constructor(private route : ActivatedRoute,
    private ecommerceService : EcommerceService,
    private imageLoader : ImageLoaderService,
    private router : Router) { 
    this.route.params.subscribe(params => console.log(params));
    this.productFDetails = new Array();
  }

  ngOnInit(): void {    
    this.ecommerceService.loadProductDetails().subscribe({
      next: data => {        
        let temp = data as Array<Object>;
        for (let i = 0 ; i< temp.length; i++ ) {
          let imageUrl : Array<string> = new Array();
          let temp2 = <ProductMetadata>temp[i];
          let temp3 = new ProductFDetails();
          temp3.price = 14.00;
          temp3.metadataid = temp2.metadataid;
          temp3.productType = temp2.productType;
          temp3.productDetails = temp2.productDetails?.at(0)?.productDetails;
          temp2.productDetails?.at(0)?.imagesurl?.split("|").forEach(t => {
            t.trim();
            imageUrl.push(t);
          });
          this.imageLoader.getBase64ImageFromURL(imageUrl.at(0)!).subscribe((base64data: string) => {    
            //console.log(base64data);
            // this is the image as dataUrl
            this.base64Image = 'data:image/jpg;base64,' + base64data;
            temp3.image.push(this.base64Image);
          });
          this.productFDetails.push(temp3);
        }
      }
    });
    
  }

  public viewProductDetails(event : any) {
    console.log(event);
    let metadataid = event.metadataid;
    this.router.navigate(["product", metadataid], {state: {eventV : event}})
  }

}
