import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClothesCategory } from 'src/app/models/clothes-category.model';
import { EcommerceService } from '../../services/ecommerce.service';

@Component({
  selector: 'app-banner-section',
  templateUrl: './banner-section.component.html',
  styleUrls: ['./banner-section.component.css']
})
export class BannerSectionComponent implements OnInit {
  public clothescategories : Array<ClothesCategory>;
  
  constructor(private ecommerceService : EcommerceService,
    private router : Router) { 
    this.clothescategories = new Array();
  }

  ngOnInit(): void {
    this.ecommerceService.loadClothesCategory().subscribe({
      next: data => {
        let temp = data as Array<Object>;
        for (let i = 0 ; i< temp.length; i++ ) {
          let temp2 = <ClothesCategory>temp[i];
          let temp1 = new ClothesCategory(temp2.categoryid, temp2.categoryname, temp2.isenable, "/assets/img/" + temp2.imageurl);
          this.clothescategories.push(temp1);
        }
      }
    });    
  }

  loadProductsByCategory( event: any) {
    console.log(event);
    let temp1 = event as ClothesCategory;
    this.router.navigate(['shop', temp1.categoryname]);    
  }

}
