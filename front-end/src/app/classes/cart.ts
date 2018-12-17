import { Ramen, allRamen } from "./ramen";
import { StoreService } from "../store.service";
import { CartItem } from "./cartItem";
// Used for storing cart data
export class Cart {
    items:CartItem[] = [];
    loaded:boolean;
    store:StoreService;
    _id:string;
    name:string = "cart";
    isPublic:boolean = true;
    owner:string;
    constructor(store?:StoreService) {
        this.loaded = false;
        if(store)
            this.store = store;
    }
    setup(store:StoreService) {
        this.store = store;
    }

    isEmpty() {
        if(this.items.length == 0)
            return true;
        return false;
    }

    addItem(ramen:Ramen, quantity:number, callback?:Function) {
        for(let i in this.items) {
            if(ramen._id == this.items[i].ramen._id) {
                this.items[i].quantity = quantity;
                this.store.saveCart(this);
                // this.store.updateRamen(ramen);
                if(callback)
                    callback(this);
                return;
            }
        }
        // if(this.loaded)
        //     ramen.quantity = +ramen.quantity - +quantity;
        this.items.push(new CartItem(ramen, quantity));
        if(this.loaded)
            this.store.saveCart(this);
        // this.store.updateRamen(ramen);
        if(callback)
            callback(this);
    }
    changeItem(ramen:Ramen, newQuanitity) {
        for(let item of this.items) {
            if(ramen._id == item.ramen._id) {
                // item.ramen.quantity = +item.ramen.quantity + +item.quantity;
                // item.quantity = newQuanitity;
                // item.ramen.quantity = +item.ramen.quantity - +item.quantity;
                item.quantity = newQuanitity;
                this.store.saveCart(this);
                // this.store.updateRamen(item.ramen);
                return;
            }
        }
        
        
    }
    removeItem(ramen:Ramen, callback?:Function) {
        for(let i in this.items) {
            if(ramen._id == this.items[i].ramen._id) {
                // ramen.quantity = +ramen.quantity + +this.items[i].quantity;
                this.items.splice(parseInt(i), 1);
                this.store.saveCart(this);
                // this.store.updateRamen(ramen);
                if(callback)
                    callback(this);
            }
        }
    }
    buyItems(callback?:Function):any {
        // Check all items
        for(var item of this.items) {
            if(item.quantity > item.ramen.quantity) {
                return false;
            }
        }
        for(var item of this.items) {
            item.ramen.quantity = +item.ramen.quantity - +item.quantity;
            item.ramen.timesOrdered = +item.ramen.timesOrdered + +item.quantity;
            this.store.updateRamen(item.ramen);
        }
        return this;
        this.clear(callback);
    }
    clear(callback?:Function) {
        this.items = [];
        this.store.saveCart(this, callback);
    }
    reset() {
        this.items = [];
        this.loaded = false;
    }
}

export class Collections {
    items:{[id:string]: Cart} = {};
    constructor() {

    }
    addCart(cart:Cart) {
        this.items[cart._id] = cart;
    }
    removeCart(cart:Cart) {
        delete this.items[cart._id];
    }
    reset() {
        this.items = {};
    }
}

export var cart = new Cart();
export var collections = new Collections();