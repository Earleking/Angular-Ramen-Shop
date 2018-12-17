import { Ramen } from "./ramen";
// Used for storing a single item that resides in a cart
export class CartItem {
    ramen:Ramen;
    quantity:number
    constructor(ramen, quantity) {
        this.ramen = ramen;
        this.quantity = quantity;
    }


}