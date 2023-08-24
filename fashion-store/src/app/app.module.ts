import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PartnerLogoComponent } from './common/partner-logo/partner-logo.component';
import { LatestBlogComponent } from './home/latest-blog/latest-blog.component';
import { InstagramSectionComponent } from './home/instagram-section/instagram-section.component';
import { ManBannerComponent } from './home/man-banner/man-banner.component';
import { WeekDealSectionComponent } from './home/week-deal-section/week-deal-section.component';
import { WomenBannerComponent } from './home/women-banner/women-banner.component';
import { BannerSectionComponent } from './home/banner-section/banner-section.component';
import { HeroSectionComponent } from './home/hero-section/hero-section.component';
import { ProductComponent } from './product/product.component';
import { BreadcrumbComponent } from './common/breadcrumb/breadcrumb.component';
import { RelatedProductsComponent } from './product/related-products/related-products.component';
import { ShopComponent } from './shop/shop.component';
import { CommonComponent } from './common/common.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { FaqComponent } from './faq/faq.component';
import { HttpClientModule } from '@angular/common/http';
import { EcommerceService } from './services/ecommerce.service';
import { AuthGuard } from './services/authguard.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './services/authentication.service';
import { CorsHandlerService } from './services/corshandler.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ImageLoaderService } from './services/imageloader.service';
import { SingleProductComponent } from './shop/single-product/single-product.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PartnerLogoComponent,
    LatestBlogComponent,
    InstagramSectionComponent,
    ManBannerComponent,
    WeekDealSectionComponent,
    WomenBannerComponent,
    BannerSectionComponent,
    HeroSectionComponent,
    ProductComponent,
    BreadcrumbComponent,
    RelatedProductsComponent,
    ShopComponent,
    CommonComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    RegisterComponent,
    LoginComponent,
    ContactComponent,
    FaqComponent,
    SingleProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    ImageLoaderService,
    EcommerceService,
    AuthGuard,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CorsHandlerService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
