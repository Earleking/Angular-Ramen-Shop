import { Component, OnInit } from "@angular/core";
import { Collections, Cart } from "../classes/cart";
import { StoreService } from "../store.service";
import { globals } from "../classes/global";
import { Router } from "../../../node_modules/@angular/router";

@Component({
    selector: "app-list",
    templateUrl: "./list.component.html",
    styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
    allCollections:Cart[];
    constructor(private store:StoreService, private router:Router) {}

    ngOnInit() {
        this.store.getPublicCollections((collections:Cart[]) => {
            this.allCollections = collections;
        });
    }

    open(openedCart:Cart) {
        // console.log(cartId);
        this.router.navigate([`./cart/${openedCart.owner}/${openedCart._id}`]);
    }
}
