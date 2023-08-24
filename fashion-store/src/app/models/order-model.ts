import { Suborder } from "./suborder-model";

export class Order {
    public status! : string;
    public paymentid! : string;
    public userid! : string;
    public subordermodels = new Array<Suborder>();
}