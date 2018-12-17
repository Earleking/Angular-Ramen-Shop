export class Ramen {
    price:number;
    name:string;
    quantity:number;
    timesOrdered:number;
    rating:number;
    url:string;
    _id:string;
    flagged:boolean = false;
    constructor() {
        
    } 
}

export var createRamen = function(json):Ramen {
    var ramen = new Ramen;
    ramen.price = json["price"];
    ramen.name = json["name"];
    ramen.quantity = json["stock"];
    ramen.timesOrdered = json["timesOrdered"];
    ramen.rating = json["rating"];
    ramen.url = json["url"];
    ramen._id = json["_id"];
    if(json["flagged"]) {
        ramen.flagged = json["flagged"];
    }
    return ramen;
}

export var allRamen:Ramen[] = [];