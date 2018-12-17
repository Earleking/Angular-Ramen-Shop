import { Injectable } from '@angular/core';
import { Person } from './classes/person';
import { HttpClient } from '../../node_modules/@angular/common/http';
import { cart, collections } from './classes/cart';
import { globals } from './classes/global';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http:HttpClient) { }

  auth(un , pw, callback:Function) {
      this.http.post(`${globals.server}/auth`, {"email": un, "password": pw}).subscribe((data) => {
          console.log(data);
          if(data["message"]){
              callback("Error");
          }
          else if(data["emailNeeded"]) {
              callback("Email");
          }
          else {
            callback(new Person(un, data["authentication"], data["active"], data["_id"]));
          }
      });
    // return null;
  }
  createUser(un:string, pw:string, callback?:Function) {
    var sendData = {
        "email": un,
        "password": pw,
        "authentication": 1,
        "active": true
    }
    this.http.post(`${globals.server}/users`, sendData).subscribe((data) => {
        cart.reset();
        collections.reset();
        if(callback)
            callback(data);
    });
  }
  editUser(user:Person) {

  }
}
