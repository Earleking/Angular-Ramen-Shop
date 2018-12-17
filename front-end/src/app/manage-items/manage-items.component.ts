import { Component, OnInit } from "@angular/core";
import { Ramen } from "../classes/ramen";
import { StoreService } from "../store.service";
import { Router } from "../../../node_modules/@angular/router";

@Component({
    selector: "app-manage-items",
    templateUrl: "./manage-items.component.html",
    styleUrls: ["./manage-items.component.css"]
})
export class ManageItemsComponent implements OnInit {
    items: Ramen[] = [];
    constructor(private store: StoreService, private router: Router) {}

    ngOnInit() {
        this.store.getAllRamen((ramens) => {
            this.items = ramens;
        });
    }

    saveItem(name, price, q, item: Ramen) {
        item.name = name;
        item.price = price;
        item.quantity = q;
        this.store.updateRamen(item);
        alert("Item Updated");
    }

    deleteItem(item: Ramen) {
        this.store.deleteRamen(item, (res) => {
            alert("Item Deleted");
            this.router.navigate(["./"]);
        });
    }

    createItem(name: string, stock: number, price: number, url) {
        var temp = new Ramen();
        temp.name = name;
        temp.quantity = stock;
        temp.price = price;
        temp.url = url;
        if (name.length <= 3) {
            alert("Name must be more than 3 characters");
            return;
        }
        if (!stock) {
            temp.quantity = 10;
            alert("Stock defaulted to 10");
        }
        if (!price) {
            temp.price = 10;
            alert("Price defaulted to 10");
        }
        if(!this.isUrl(url)) {
            alert("Invalid url");
            return;
        }

        this.store.createRamen(temp, res => {
            console.log(res);
            alert("Item added");
            this.router.navigate(["./"]);
        });
    }
    
    flagItem(item:Ramen) {
        console.log(item);
        if(item.flagged == true)
            item.flagged = false
        else
            item.flagged = true;
        this.store.updateRamen(item);
    }

    isUrl(url:string) {
        try {
            new URL(url);
            return true;
        } catch (_) {
            return false;
        }
    }
}
