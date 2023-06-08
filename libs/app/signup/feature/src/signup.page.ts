import { Component, OnInit } from "@angular/core";
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';
//import { environment } from 'src/environments/environment';

interface formDataInterface {
  "username": string;
  "email": string;
  "password": string;
  "confirm_password": string;
  [key: string]: string;
};

@Component({
  selector: "signup-page",
  templateUrl: "./signup.page.html",
  styleUrls: ["./signup.page.scss"],
})

export class SignupPage implements OnInit {

  username = "";
  email_address = "";
  password = "";
  confirm_password = "";

  constructor(private router: Router) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit(): void {}
  

  login() {
    alert("login");
    this.router.navigate(['/login']);
  }

  createAccount() {
    alert("create account");
  }

  guest() {
    alert("Entering Guest...");
  }

  onSignup(form: NgForm){

    // if (form.valid) {

    //   const poolData = {
    //   //  UserPoolId: environment.cognitoUserPoolId, // Your user pool id here
    //   //  ClientId: environment.cognitoAppClientId // Your client id here
    //    UserPoolId: "temp", // Your user pool id here
    //    ClientId: "temp"
    //  };

    //  const userPool = new CognitoUserPool(poolData);
    //  const attributeList = [];

    //  const formData:formDataInterface = {
    //    "username": this.username,
    //    "email": this.email_address,
    //    "password": this.password,
    //    "confirm_password": this.confirm_password,
    //  }

    //  for (const key  in formData) {
    //    const attrData = {
    //      Name: key,
    //      Value: formData[key]
    //    }
    //    const attribute = new CognitoUserAttribute(attrData);
    //    attributeList.push(attribute)
    //  }
     
    //  userPool.signUp(this.email_address, this.password, attributeList, [], ( err, result ) => {

    //   if (err) {
    //      alert(err.message || JSON.stringify(err));
    //      return;
    //    }
    //    this.router.navigate(['/profile']);

    //  });
    // }
 }
}
