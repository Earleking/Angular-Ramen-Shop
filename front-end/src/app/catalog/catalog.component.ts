import { Component, OnInit, Output, Input } from "@angular/core";
import { user, Person } from "../classes/person";
import { Router } from "../../../node_modules/@angular/router";
import { Ramen } from "../classes/ramen";
import { StoreService } from "../store.service";
import { DomSanitizer } from "../../../node_modules/@angular/platform-browser";
import { Cart, cart, collections } from "../classes/cart";
import * as $ from "jquery";
import { Comment } from "../classes/comment";
@Component({
    selector: "app-catalog",
    templateUrl: "./catalog.component.html",
    styleUrls: ["./catalog.component.css"]
})
export class CatalogComponent implements OnInit {
    user:Person;
    ramens:Ramen[] = [];
    overlayDisplay = "none";
    currentRamen:Ramen = new Ramen();
    currentComments:Comment[] = [];
    showComments:boolean = true;
    collections = collections;
    constructor(private router:Router, private store:StoreService, private sanitizer:DomSanitizer) {
    }

    ngOnInit() {
        $("[type='number']").keypress(function(evt) {
            evt.preventDefault();
        });
        this.user = user;
        // if(!user.active) {
        //     this.router.navigate(['/']);
        // }
        this.store.getAllRamen((ramens:Ramen[]) => {
            for(var r in ramens) {
                if(ramens[r].quantity <= 0 || ramens[r].flagged) {
                    ramens.splice(parseInt(r), 1);
                }
            }
            this.ramens = ramens;
        });
        
    }

    getUrl(url) {
        // console.log(url);
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }

    showOverlay(ramen:Ramen) {
        this.currentRamen = ramen;
        this.overlayDisplay = "grid";
        this.store.getCommentsForItem(ramen, (comments) => {
            for(var comment of comments) {
                var com:Comment = new Comment(user, ramen, comment["title"], comment["text"], comment["rating"], comment["hidden"]);
                com.name = comment["name"];
                if(com.hidden)
                    continue;
                this.currentComments.push(com);
            }
            this.currentComments.slice(0, 5);
            console.log(this.currentComments);
        });
    }

    hideOverlay() {
        this.overlayDisplay = "none";
        this.currentComments = [];
        this.showComments = true;
    }

    addToCart(ramen:Ramen, numb:number, cartId:string) {
        if(cartId == "main"){
            cart.addItem(ramen, numb, (newCart) => {
                alert("Item Added to Cart");
                this.hideOverlay();
            });
        }
        else {
            collections.items[cartId].addItem(ramen, numb, (newCart) => {
                alert("Item added to Collection");
                this.hideOverlay();
            });
        }
        
    }
    addComments() {
        this.showComments = false;
    }
    stopAddingComments() {
        this.showComments = true;
    }
    addComment(title, text, rating) {
        var comment = new Comment(user, this.currentRamen, title, text, rating, false);
        this.store.addCommentToItem(this.currentRamen, comment, (res) => {
            console.log(res);
            this.hideOverlay();
        });
    }
}
