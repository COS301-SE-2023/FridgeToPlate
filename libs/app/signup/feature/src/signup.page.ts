import { Component, OnInit } from "@angular/core";
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CognitoIdentityCredentials } from "aws-sdk";
import { ProfileAPI } from '@fridge-to-plate/app/profile/data-access';
import { Select, Store } from '@ngxs/store';
import { SignUp } from "@fridge-to-plate/app/auth/utils";
import { Navigate } from "@ngxs/router-plugin";

declare let AWS: any;
//import { environment } from 'src/environments/environment';

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

  constructor(private store: Store) {}

  login() {
    this.store.dispatch(new Navigate(['/login']));
  }

  guest() {
    this.store.dispatch(new Navigate(['/home']));
  }

  onSignup(form: NgForm){
    if (form.valid) {
      this.store.dispatch(new SignUp(this.username, this.password, this.email_address));
    }
 }
}
