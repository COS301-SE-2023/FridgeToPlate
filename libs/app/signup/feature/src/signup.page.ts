import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import { Store } from '@ngxs/store';
import { SignUp } from "@fridge-to-plate/app/auth/utils";
import { Navigate } from "@ngxs/router-plugin";

@Component({
  selector: "signup-page",
  templateUrl: "./signup.page.html",
  styleUrls: ["./signup.page.scss"],
})

export class SignupPage {

  username = "";
  email_address = "";
  password = "";
  confirm_password = "";
  logoImage = "/assets/Fridge Transparent.png";

  constructor(private store: Store) {}

  login() {
    this.store.dispatch(new Navigate(['/login']));
  }

  guest() {
    this.store.dispatch(new Navigate(['/recommend']));
  }

  onSignup(form: NgForm){
    if (form.valid) {
      this.store.dispatch(new SignUp(this.username, this.password, this.email_address));
    }
 }
}
