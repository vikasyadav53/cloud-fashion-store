export class ClothesCategory {
    public categoryid : string;
    public categoryname : string;
    public isenable : Boolean;
    public imageurl : string;

    constructor(categoryid : string, categoryName : string, isenable : Boolean, imageurl: string) {
        this.categoryid = categoryid;
        this.categoryname = categoryName;
        this.isenable = isenable;
        this.imageurl = imageurl;
    }
}