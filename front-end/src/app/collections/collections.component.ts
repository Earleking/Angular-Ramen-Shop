import { Component, OnInit } from "@angular/core";
import { Cart, collections } from "../classes/cart";
import { DomSanitizer } from "../../../node_modules/@angular/platform-browser";
import { Ramen } from "../classes/ramen";
import { store } from "../../../node_modules/@angular/core/src/render3";
import { StoreService } from "../store.service";
import { Router } from "../../../node_modules/@angular/router";

@Component({
    selector: "app-collections",
    templateUrl: "./collections.component.html",
    styleUrls: ["./collections.component.css"]
})
export class CollectionsComponent implements OnInit {
    overlayDisplay = "none";
    currentCart:Cart;
    collections = collections;
    testData = "<b>Hello World</b>";
    currentRamen:Ramen;
    overlayText:string;
    acceptFunction:Function;
    totalCost;
    overlayNumber:number = 1;
    constructor(private sanitizer:DomSanitizer, private store:StoreService, private router:Router) {}

    ngOnInit() {
        // this.testData = this.sanitizer.bypassSecurityTrustHtml("<b>Hello World</b>");
    }
    changeCollection(value:string) {
        this.hideOverlay();
        if(value.length == 0) {
            this.currentCart = null;
            this.totalCost = 0;
            return;
        }
        console.log(value);
        this.currentCart = collections.items[value];
        this.updateCost();
    }
    showOverlay(ramen:Ramen) {
        this.overlayNumber = 1;
        this.currentRamen = ramen;
        this.overlayText = "Are you sure you want to remove this item?"
        this.acceptFunction = this.removeItem;
        this.overlayDisplay = "block";
    }
    hideOverlay() {
        this.overlayDisplay = "none";
    }
    showClearOverlay() {
        this.overlayNumber = 1;
        this.overlayText = "Are you sure you want to remove all items?"
        this.acceptFunction = this.clearCart;
        this.overlayDisplay = "block";
    }

    removeItem() {
        this.currentCart.removeItem(this.currentRamen, (newCart) => {
            this.currentCart = this.currentCart;
            this.hideOverlay();
            this.updateCost();
        });
    }

    clearCart() {
        this.currentCart.clear((res) => {
            this.updateCost();
            this.hideOverlay();
        });
    }
    updateCost() {
        this.totalCost = 0;
        for(var item of this.currentCart.items)  {
            this.totalCost = +this.totalCost + +(item.quantity * item.ramen.price);
        }
    }

    askNewCollection() {
        this.acceptFunction = this.createNewCollection;
        this.overlayText = "Create New Collection";
        this.overlayNumber = 2;
        this.overlayDisplay = "block";
    }
    askDeleteCollection() {
        this.acceptFunction = this.deleteCollection;
        this.overlayText = "Are you sure you want to delete this collection?"
        this.overlayNumber = 1;
        this.overlayDisplay = "block";
    }
    askEditCOllection() {
        this.overlayText = "Edit Collection";
        this.overlayNumber = 3;
        this.overlayDisplay = "block";
    }
    createNewCollection(name, isPublic) {
        var newCart = new Cart(this.store);
        for(var oneCart in collections.items) {
            if(collections.items[oneCart].name == name){
                alert("Duplicate Cart Name");
                return;
            }
        }
        newCart.name = name;
        newCart.isPublic = isPublic;
        this.store.createCollection(newCart, (data) => {
            this.collections = collections;
            alert("Collection created");
            this.hideOverlay();
            this.router.navigate(["./"]);
        });
    }
    deleteCollection() {
        this.store.deleteCollection(this.currentCart, (res) => {
            this.collections = collections;
            alert("Collection deleted");
            this.hideOverlay();
            this.router.navigate(["./"]);
        });
    }
    updateCollection(newName:string, newPrivacy:boolean) {
        for(var oneCart in collections.items) {
            if(collections.items[oneCart].name == name){
                alert("Duplicate Cart Name");
                return;
            }
        }
        this.currentCart.name = newName;
        this.currentCart.isPublic = newPrivacy;
        this.store.updateCart(this.currentCart, (data) => {
            alert("Cart Saved");
            this.hideOverlay();
        })

    }
    shareCollecton() {
        const el = document.createElement('textarea');
        el.value = "str";
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        alert("Share link copied");
    }
}
