import { Component, OnInit } from "@angular/core";
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CognitoIdentityCredentials } from "aws-sdk";
import { ProfileAPI } from '@fridge-to-plate/app/profile/data-access';
import { Select, Store } from '@ngxs/store';
import { SignUp } from "@fridge-to-plate/app/auth/utils";

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

  constructor(private router: Router, private store: Store) {}

  login() {
    this.router.navigate(['/login']);
  }

  guest() {

    const credentials = new CognitoIdentityCredentials({
      IdentityPoolId: "temp",
      RoleArn: 'temp',
      //LoginId: 'example@gmail.com'
    });

    AWS.config.region = "eu-west-3";
    AWS.config.credentials = credentials;

    credentials.get((err: any) => {
      if (err) {
        alert(err);
        console.log('Authentication failed:', err);
      } else {
        this.router.navigate(['/profile']);
      }
    });
  }

  onSignup(form: NgForm){
    if (form.valid) {
      this.store.dispatch(new SignUp(this.username, this.password, this.email_address));
    }
 }
}
