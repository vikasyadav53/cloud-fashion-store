import { ClothesCategory } from "./clothes-category.model";
import { ProductDetails } from "./product-details.model";

export class ProductMetadata {
    
	public brand : string | undefined;
	public careInstructions : string | undefined ;
	public title : string  | undefined;
	public productType : string | undefined ;
	public body : string | undefined ;
	public sizeFit : string | undefined ;
	public completeTheLook : string | undefined ;
	public type : string | undefined ;
	public isInStock : string | undefined ;
	public inventory : string | undefined ;
	public clothesCategory : ClothesCategory | undefined;
	public metadataid : number | undefined;
	public productDetails : Array<ProductDetails> | undefined;

}
