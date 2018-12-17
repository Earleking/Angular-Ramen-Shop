import { Component, OnInit } from "@angular/core";
import { Person } from "../classes/person";
import { StoreService } from "../store.service";

@Component({
    selector: "app-manage-users",
    templateUrl: "./manage-users.component.html",
    styleUrls: ["./manage-users.component.css"]
})
export class ManageUsersComponent implements OnInit {
    users:Person[] = [];
    constructor(private store:StoreService) {}

    ngOnInit() {
        this.store.loadPeople((peoples) => {
            this.users = peoples;
            console.log(peoples);
        });
    }
    
    saveUser(email, auth, active, user:Person) {
        // this.store.
        user.email = email;
        user.authentication = auth;
        user.active = active;
        this.store.savePerson(user, (res) => {
            console.log(res);
            alert("User Updated");
        });
    }
}
