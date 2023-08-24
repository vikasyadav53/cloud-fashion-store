import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductFDetails } from 'src/app/models/product-f-details.model';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {

  @Input("productFDetails") productFDetails : ProductFDetails | undefined;
  @Output("selectedProduct") selectedProduct: EventEmitter<ProductFDetails>;

  constructor() {
    this.selectedProduct = new EventEmitter();
   }

  ngOnInit(): void {
  }

  public viewProduct() {
    this.selectedProduct.emit(this.productFDetails);
  }

}
