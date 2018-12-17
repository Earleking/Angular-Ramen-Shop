import {
    Component,
    OnInit,
    Input
} from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { Person, user } from "./classes/person";
import { Router } from "../../node_modules/@angular/router";
import { Ramen } from './classes/ramen';
import { StoreService } from './store.service';
import { cart } from "./classes/cart";
import { LoginServiceService } from "./login-service.service";
@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
    //   template: '{{user.active}}'
})
export class AppComponent implements OnInit {
    title = "front-end";
    user = user;
    constructor(
        private router: Router,
        private store:StoreService,
        private loginService:LoginServiceService
    ) {}
    ngOnInit() {
        this.user = user;
        cart.setup(this.store);

        // TODO Delete on production
        this.store.loadCart(res => {
            this.router.navigate(["../"]);
            // this.login();
        });
        
    }
    personLoggedIn($person) {
        console.log($person);
    }

    toLogin() {
        this.router.navigate(["./login"]);
    }
    toSignUp() {
        this.router.navigate(["./signup"]);
    }
    toHome() {
        this.router.navigate(["/"]);
    }
    toCatalog() {
        this.router.navigate(["./catalog"]);
    }
    toCart() {
        this.router.navigate(["./cart"]);
    }
    toCollections() {
        this.router.navigate(["./collections"]);
    }
    toList() {
        this.router.navigate(["./list"]);
    }
    toManageUsers() {
        this.router.navigate(["./managepeople"])
    }
    toManageItems() {
        this.router.navigate(["./manageitems"]);
    }
    toManageComments() {
        this.router.navigate(["./managecomments"]);
    }
    toDMCA() {
        this.router.navigate(["./dmca"]);
    }
    toPrivacy() {
        this.router.navigate(["./privacy"]);
    }
    toComplaints() {
        this.router.navigate(["./complaints"]);
    }
    logOut() {
        this.user.active = false;
        this.toHome();
    }


    // TODO DELETE ON PRODUCTION 
    login() {
        this.loginService.auth("store manager", "password", (newUser) => {
            if(newUser == "Error") {
                alert("Incorrect Username or Password");
                return;
            }
            if(newUser == "Email") {
                alert("You need to authenticate your email");
                return;
            }
            var person: Person = newUser;
            if (person) {
                // login was successful
                if (!person.active) {
                    alert(
                        "Your account iss deactivated. Please see the store manager"
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
