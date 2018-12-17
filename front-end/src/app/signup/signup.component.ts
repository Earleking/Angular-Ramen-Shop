import { Component, OnInit } from "@angular/core";
import { LoginServiceService } from "../login-service.service";
import { Router } from "../../../node_modules/@angular/router";

@Component({
    selector: "app-signup",
    templateUrl: "./signup.component.html",
    styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
    constructor(private login: LoginServiceService,private router: Router) {}

    ngOnInit() {
    }

    signUp(email: string, pw: string) {
        if (email.length == 0) {
            alert("Enter an email");
            return;
        }
        if(!this.validateEmail(email)) {
            alert("Invalid email");
            return;
        }
        if(pw.length < 4) {
            alert("Enter a longer password");
            return;
        }

        this.login.createUser(email, pw, (data) => {
            if(data["message"]) {
                alert("User already exists with that username");
            }
            else {
                alert("User successfully created");
                this.router.navigate(["./login"])
            }
        });
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
}
