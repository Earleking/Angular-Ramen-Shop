import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "../../../node_modules/@angular/router";
import { StoreService } from "../store.service";
import { Cart } from "../classes/cart";
import { Person } from "../classes/person";

@Component({
    selector: "app-single-collection",
    templateUrl: "./single-collection.component.html",
    styleUrls: ["./single-collection.component.css"]
})
export class SingleCollectionComponent implements OnInit {
    currentCart:Cart;
    owner:Person = new Person("none@g", 0, true);
    constructor(private route: ActivatedRoute, private store:StoreService) {}

    ngOnInit() {
        var cartId = this.route.snapshot.paramMap.get("cart");
        var userId = this.route.snapshot.paramMap.get("user");
        this.store.loadSingleCart(cartId, (newCart) => {
            this.currentCart = newCart;
        });
        this.store.loadPerson(userId, (person) => {
            this.owner = person;
        });
    }
}
