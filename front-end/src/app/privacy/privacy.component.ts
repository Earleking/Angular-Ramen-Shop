import { Component, OnInit } from "@angular/core";
import { StoreService } from "../store.service";
import { user } from "../classes/person";

@Component({
    selector: "app-privacy",
    templateUrl: "./privacy.component.html",
    styleUrls: ["./privacy.component.css"]
})
export class PrivacyComponent implements OnInit {
    text = "";
    overlayDisplay = "none";
    user = user;
    constructor(private store:StoreService) {}

    ngOnInit() {
        this.store.getPolicyText("privacy", (text) => {
            console.log(text);
            this.text = text;
        });
    }

    saveText(newText:string) {
        this.store.updatePolicyText("privacy", newText, (newText) => {
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
