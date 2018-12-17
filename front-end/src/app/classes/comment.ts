import { Person } from "./person";
import { Ramen } from "./ramen";

export class Comment {
    name = "";
    _id:string = "";
    constructor(public user:Person, public item:Ramen, public title:string, public text:string, public rating:number, public hidden:boolean) {

    }    
}