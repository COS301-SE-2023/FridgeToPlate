import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import { Login } from "@fridge-to-plate/app/auth/utils";
import { Navigate } from "@ngxs/router-plugin";
import { Store } from "@ngxs/store";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: "login-page",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class LoginPage {

  username = "";
  password = "";

  constructor(private store: Store) { }

  onSignIn(form: NgForm){
    if (form.valid) {
      this.store.dispatch(new Login(this.username, this.password));
    }
  }
  
  reset() {
    alert("Resetting...");
  }
  
  create() {
    this.store.dispatch(new Navigate(['/signup']));
  }

  guest() {
    this.store.dispatch(new Navigate(['/recommend']));
  }
}

