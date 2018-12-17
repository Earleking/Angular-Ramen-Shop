import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { LoginServiceService } from "../login-service.service";
import { Person, user } from "../classes/person";
import { Router } from "@angular/router";
import { StoreService } from "../store.service";
@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
    //   @Output() messageEvent = new EventEmitter<Person>();
    constructor(
        private loginService: LoginServiceService,
        private router: Router,
        private store: StoreService
    ) {}

    ngOnInit() {}

    login(un, pw) {
        this.loginService.auth(un, pw, (newUser) => {
            if(newUser == "Error") {
                alert("Incorrect Username or Password");
                return;
            }
            if(newUser == "Email") {
                alert("You need to verify your email");
                return;
            }
            var person: Person = newUser;
            if (person) {
                // login was successful
                if (!person.active) {
                    alert(
                        "Your account is deactivated. Please see the store manager"
                    );
                    return;
                }
                user.email = person.email;
                user.name = person.email.split("@")[0];
                user.admin = person.admin;
                user.authentication = person.authentication;
                user.active = person.active;
                user._id = person._id;
                this.store.loadCart(res => {
                    this.router.navigate(["../"]);
                });
                    //   user = person;
            } else {
                //   login failed
                alert("Either username or password is incorrect");
            }
        });
    }
}
