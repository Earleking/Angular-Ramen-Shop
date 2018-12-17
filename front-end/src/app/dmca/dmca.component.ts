import { Component, OnInit } from "@angular/core";
import { StoreService } from "../store.service";
import { user } from "../classes/person";

@Component({
    selector: "app-dmca",
    templateUrl: "./dmca.component.html",
    styleUrls: ["./dmca.component.css"]
})
export class DmcaComponent implements OnInit {
    text: string = "";
    overlayDisplay = "none";
    user = user;
    constructor(private store: StoreService) {}
    ngOnInit() {
        this.store.getPolicyText("dmca", (text) => {
            console.log(text);
            this.text = text;
        });
    }

    saveText(newText:string) {
        this.store.updatePolicyText("dmca", newText, (newText) => {
            alert("Policy Updated");
            this.text = newText;
            this.hideOverlay();
        });
    }

    showOverlay() {
        this.overlayDisplay = "block";
    }

    hideOverlay() {
        this.overlayDisplay = "none";
    }
}
