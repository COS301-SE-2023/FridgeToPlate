import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import { Store } from '@ngxs/store';
import { SignUp } from "@fridge-to-plate/app/auth/utils";
import { Navigate } from "@ngxs/router-plugin";
import { ShowError } from "@fridge-to-plate/app/error/utils";

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
  logoImage = "/assets/Fridge Logo Transparent.png";

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.username = "";
    this.email_address = "";
    this.password = "";
    this.confirm_password = "";
  }

  login() {
    this.store.dispatch(new Navigate(['/login']));
  }

  guest() {
    this.store.dispatch(new Navigate(['/home']));
  }

  onSignup(form: NgForm){

    if (this.username.trim() == '') {
      this.store.dispatch(new ShowError("Username Is Required"));
      return;
    }
    if (this.email_address.trim() == '') {
      this.store.dispatch(new ShowError("Email Is Required"));
      return;
    }
    if (this.password.trim() == '') {
      this.store.dispatch(new ShowError("Password Is Required"));
      return;
    }
    if (this.password.trim().length < 8) {
      this.store.dispatch(new ShowError("Password Must Be At Least 8 Characters Long"));
      return;
    }
    if (this.confirm_password.trim() == '') {
      this.store.dispatch(new ShowError("Confirm Your Password"));
      return;
    }
    if (this.confirm_password.trim().length < 8) {
      this.store.dispatch(new ShowError("Confirm Password Must Be At Least 8 Characters Long"));
      return;
    }

    if (form.valid && this.password == this.confirm_password) {
      this.store.dispatch(new SignUp(this.username, this.password, this.email_address));
    }
    else {
      this.store.dispatch(new ShowError("Password And Confirm Password Must Be The Same"));
    }
 }
}
