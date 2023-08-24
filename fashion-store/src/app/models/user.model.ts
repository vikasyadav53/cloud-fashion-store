export class User {
    public userId : String ;
    public userName? : String;
    public password : String;

    constructor(userId : String, password: String , userName ? : String) {
        this.userId = userId;
        if (userName != undefined && userName != null ) {
            this.userName = userName;
        }
        this.password = password;
    }


}