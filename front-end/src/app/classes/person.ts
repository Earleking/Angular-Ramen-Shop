export class Person {
    email:string;
    authentication:number;
    active:boolean;
    admin:boolean;
    name:string;
    _id:string; //user id
    constructor(email:string, authLevel:number, active:boolean, id?:string) {
        this.email = email;
        this.authentication = authLevel;
        this.active = active;
        this.admin = false;
        if(authLevel == 0) {
            this.admin = true;
        }
        this.name = email.split('@')[0];
        this._id = "5bff29c062f0b555a8427a3a";
        if(id)
            this._id = id;
        console.log(this._id);
    }

}

export var user = new Person("abc@gmail.com", 0, false);