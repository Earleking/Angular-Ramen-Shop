import { Injectable } from "@angular/core";
import { HttpClient } from "../../node_modules/@angular/common/http";
import { Observable } from "../../node_modules/rxjs";
import { allRamen, createRamen, Ramen } from "./classes/ramen";
import { cart, Cart, collections, Collections } from "./classes/cart";
import { user, Person } from "./classes/person";
import { CartItem } from "./classes/cartItem";
import { Comment } from "./classes/comment";
import { globals } from "./classes/global";
import { Complaint } from "./classes/complaint";
import { callbackify } from "util";

@Injectable({
    providedIn: "root"
})
export class StoreService {
    constructor(private http: HttpClient) {}

    getAllRamen(callback?) {
        this.http.get(`${globals.server}/items`).subscribe((data) => {
            allRamen.length = 0;
            for(var i in data){
                allRamen.push(createRamen(data[i]));
            }
            if(callback)
                callback(allRamen);
        });
    }

    updateRamen(ramen:Ramen) {
        var data = JSON.parse(JSON.stringify(ramen));
        console.log(data);
        this.http.post(`${globals.server}/items/` + ramen._id, data).subscribe((res) => {
            console.log(res);
        });
    }

    createRamen(ramen:Ramen, callback?:Function) {
        var data = JSON.parse(JSON.stringify(ramen));

        this.http.post(`${globals.server}/items/`, data).subscribe((res) => {
            console.log(res);
            if(callback)
                callback(res);
        });
    }

    deleteRamen(ramen:Ramen, callback?:Function) {
        this.http.delete(`${globals.server}/items/` + ramen._id).subscribe((res) => {
            console.log(res);
            if(callback)
                callback(res);
        });
    }

    loadCart(callback?:Function) {
        cart.reset();
        collections.reset();
        this.http.get(`${globals.server}/carts/` + user._id).subscribe((data) => {
            this.getAllRamen((ramens) => {
                var cartData = [];
                var collectionData = [];
                var hasACart = false;
                for(var i in data){
                    // Add main cart as cart
                    if(data[i]["name"] == "cart") {
                        cartData = data[i];
                        cart._id = cartData["_id"];
                        hasACart = true;
                    }
                    // Add others as collection
                    else {
                        collectionData.push(data[i]);
                    }
                }
                if(!hasACart) {
                    console.log("no cart");
                }
                // Add data to main cart
                var items = cartData["items"];
                if(items) {
                    for(var item of items) {
                        for(var ramen of allRamen) {
                            if(ramen._id == item.ramen._id) {
                                cart.addItem(ramen, item["quantity"]);
                            }
                        }
                    }
                }
                cart.loaded = true;

                // add data to collections
                for(var collectionD of collectionData) {
                    var items = collectionD["items"];
                    var tempCart = new Cart(this);
                    tempCart._id = collectionD["_id"];
                    tempCart.name = collectionD["name"];
                    if(items) {
                        for(var item of items) {
                            for(var ramen of allRamen) {
                                if(ramen._id == item.ramen._id) {
                                    tempCart.addItem(ramen, item["quantity"]);
                                }
                            }
                        }
                    }
                    collections.addCart(tempCart);
                }
                console.log(collections);
                cart.loaded = true;
                if(callback)
                    callback(cart);
            });
        });
    }

    getPublicCollections(callback:Function) {
        this.http.get(`${globals.server}/carts/public`).subscribe((data) => {
            var tempCollection:Cart[] = [];
            for(var i in data) {
                var item = data[i];
                var collection = new Cart(this);
                collection.name = item["name"];
                collection._id = item["_id"];
                collection.owner = item["user"];
                tempCollection.push(collection);
            }
            callback(tempCollection);
        });
    }

    updateCart(saveCart:Cart, callback?:Function) {
        var data = {
            "name": saveCart.name,
            "public": saveCart.isPublic
        };
        this.http.post(`${globals.server}/carts/${user._id}/${saveCart._id}`, data).subscribe((data) => {
            if(data["message"]){
                console.log(data["message"]);
            }
            else {
                if(callback)
                    callback(data);
            }     
        });
    }

    saveCart(saveCart:Cart, callback?:Function) {
        console.log("savecart");
        this.http.post(`${globals.server}/carts/${user._id}/${saveCart._id}`, {'items': saveCart.items}).subscribe((data) => {
            if(data["message"]){
                this.loadCart((data) => {
                    this.saveCart(saveCart, callback);
                });
            }
            else {
                console.log(data);
                if(callback)
                    callback(data);
            }     
        });
    }

    getCommentsForItem(ramen:Ramen ,callback:Function) {
        this.http.get(`${globals.server}/comments/` + ramen._id).subscribe((res) => {
            callback(res);
        });
    }

    addCommentToItem(ramen:Ramen, comment:Comment, callback?:Function) {
        var data = JSON.parse(JSON.stringify(comment));
        this.http.post(`${globals.server}/comments`, data).subscribe((res) => {
            if(callback)
                callback(res);
        });
    }

    createCollection(collection:Cart, callback?:Function) {
        var data = {"name": collection.name, "public": collection.isPublic};
        this.http.put(`${globals.server}/carts/` + user._id, data).subscribe((res) => {
            collection._id = res["_id"];
            console.log(collection);
            collections.addCart(collection);
            if(callback)
                callback(res);
        });
    }

    deleteCollection(collection:Cart, callback?:Function) {
        this.http.delete(`${globals.server}/carts/${user._id}/${collection._id}`).subscribe((res) => {
            console.log(collection);
            collections.removeCart(collection);
            if(callback)
                callback(res);
        });
    }

    loadSingleCart(cartId:string, callback:Function) {
        this.http.get(`${globals.server}/cart/` + cartId).subscribe((data) => {
            this.getAllRamen((ramens) => {
                var tempCart = new Cart(this);
                var collectionData = [];
                // add data to collections
                var items = data["items"];
                tempCart._id = data["_id"];
                tempCart.name = data["name"];
                tempCart.isPublic = true;
                tempCart.owner = data["user"];
                if(items) {
                    for(var item of items) {
                        for(var ramen of allRamen) {
                            if(ramen._id == item.ramen._id) {
                                tempCart.addItem(ramen, item["quantity"]);
                            }
                        }
                    }
                }            
                if(callback)
                    callback(tempCart);
            });
        });
    }

    loadPerson(personId, callback:Function) {
        this.http.get(`${globals.server}/users/${personId}`).subscribe((data) => {
            console.log(personId);
            var pep = new Person(data["email"], data["authentication"], data["active"], personId);
            callback(pep);
        });
    }

    loadPeople(callback) {
        this.http.get(`${globals.server}/users`).subscribe((data) => {
            var peoples:Person[] = [];
            for(var i in data) {
                var p = data[i];
                if(p["authentication"] == 0)
                    continue;
                peoples.push(new Person(p["email"], p["authentication"], p["active"], p["_id"]));
            }
            callback(peoples);
        });
    }

    savePerson(person:Person, callback?:Function) {
        var data = JSON.parse(JSON.stringify(person));
        this.http.post(`${globals.server}/users/${person._id}`, data).subscribe((res) => {
            if(callback)
                callback(res);
        });
    }
    getComments(callback:Function) {
        this.http.get(`${globals.server}/comments`).subscribe((data) => {
            console.log(data);
            var allComments:Comment[] = [];
            for(var i in data) {
                var commentData = data[i];
                var comment = new Comment(new Person("", 0, false), new Ramen(), commentData["title"], commentData["text"], commentData["rating"], commentData["hidden"]);
                if(comment.hidden == undefined)
                    comment.hidden = false;
                comment._id = commentData["_id"];
                allComments.push(comment);
            }
            callback(allComments);
        });
    }

    updateComment(comment:Comment, callback?:Function) {
        this.http.post(`${globals.server}/comment/${comment._id}`, {"hidden": comment.hidden}).subscribe((data) => {
            if(callback)
                callback(data);
        });
    }

    getPolicyText(type:string, callback:Function) {
        this.http.get(`${globals.server}/policy/${type}`).subscribe((data) => {
            callback(data["body"]);
        });
    }

    updatePolicyText(type:string, newText:string, callback?:Function) {
        this.http.post(`${globals.server}/policy/${type}`, {"text": newText}).subscribe((data) => {
            if(callback)
                callback(data["body"]);
        });
    }
    getAllComplaints(callback) {
        this.http.get(`${globals.server}/notice`).subscribe((data) => {
            var complaints:Complaint[] = [];
            for(var i in data) {
                var item = data[i];
                var complaint = new Complaint();
                complaint.filee = item["filee"];
                complaint.contents = item["body"];
                complaint.type = item["type"];
                complaint.resolved = item["resolved"];
                complaint._id = item["_id"];
                complaints.push(complaint);
            }
            callback(complaints);
        });
    }

    addComplaint(complaint:Complaint, callback?:Function) {
        var data = {
            "filee": complaint.filee,
            "type": complaint.type,
            "text": complaint.contents
        }
        this.http.post(`${globals.server}/notice`, data).subscribe((data) => {
            if(callback) 
                callback(data);
        });
    }

    resolveComplaint(complaint:Complaint, callback?:Function) {
        this.http.post(`${globals.server}/notice/${complaint._id}`, {}).subscribe((data) => {
            if(callback) 
                callback(data);
        });
    }
}
