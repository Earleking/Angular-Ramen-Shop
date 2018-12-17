import { Component, OnInit, Input } from "@angular/core";
// import * as % from "jq"
import * as $ from "jquery";
import { Ramen } from "../classes/ramen";
import { cart, Cart } from "../classes/cart";
import { StoreService } from "../store.service";
import { user } from "../classes/person";
import { CartItem } from "../classes/cartItem";

@Component({
    selector: "app-cart",
    templateUrl: "./cart.component.html",
    styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit {
    cart = cart;
    overlayDisplay = "none";
    currentRamen:Ramen = new Ramen();
    totalCost:number = 0;
    overlayText = "";
    acceptFunction:Function;

    constructor(private store:StoreService) { }

    ngOnInit() {
        $("[type='number']").keypress(function(evt) {
            evt.preventDefault();
        });
        // this.store.loadCart((data) => {
        //     // console.log(this.cart.items);
        // });
        this.updateCost();
    }

    showOverlay(ramen:Ramen) {
        this.currentRamen = ramen;
        this.overlayText = "Are you sure you want to remove this item?"
        this.acceptFunction = this.removeItem;
        this.overlayDisplay = "block";
    }
    hideOverlay() {
        this.overlayDisplay = "none";
    }
    showClearOverlay() {
        this.overlayText = "Are you sure you want to remove all items?"
        this.acceptFunction = this.clearCart;
        this.overlayDisplay = "block";
    }
    showBuyOverlay() {
        this.overlayText = "Are you sure you want to buy the items?"
        this.acceptFunction = this.buyItems;
        this.overlayDisplay = "block";
    }


    removeItem() {
        cart.removeItem(this.currentRamen, (newCart) => {
            this.cart = cart;
            this.hideOverlay();
            this.updateCost();
        });
    }

    clearCart() {
        cart.clear((res) => {
            this.updateCost();
            this.hideOverlay();
        });
    }
    updateQuantity(cartItem:CartItem, quantity:number) {
        console.log(quantity);
        if(quantity > cartItem.ramen.quantity){
            quantity = cartItem.ramen.quantity;
        }
        cart.changeItem(cartItem.ramen, quantity);
        this.updateCost();
    }

    updateCost() {
        this.totalCost = 0;
        for(var item of cart.items)  {
            this.totalCost = +this.totalCost + +(item.quantity * item.ramen.price);
        }
    }

    buyItems() {
        var t = cart.buyItems();
        if(t != false) {
            var string = ""
            for(var item of this.cart.items) {
                string += item.ramen.name + ": " + item.quantity + " - " + item.ramen.price + "\n";
            }
            string += "Final cost: $" + this.totalCost;
            alert(string);
            cart.clear();
            this.updateCost();
        }
        else {
            alert("There was an issue with quantity");
        }
        this.hideOverlay();
    }
    
}
