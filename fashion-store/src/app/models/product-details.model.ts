import { ProductMetadata } from "./product-metadata.model";

export class ProductDetails {

	public  uniqueId : string | undefined;	
	public productId : number | undefined;
	public  size : string | undefined;
	public  dominantMaterial : string | undefined;
	public  actualColor : string | undefined;
	public  dominantColor : string | undefined;
	public  productDetails : string | undefined;
	public  specifications : string | undefined;
	public  imagesurl : string | undefined;
	public  productMetadatList : Array<ProductMetadata> | undefined;

}