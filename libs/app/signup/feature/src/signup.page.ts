import { Component, OnInit } from "@angular/core";
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationDetails, CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';
import { CognitoIdentityCredentials } from "aws-sdk";
declare let AWS: any;
//import { environment } from 'src/environments/environment';

interface formDataInterface {
  "custom:username": string;
  "email": string;
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

  constructor(private router: Router) {  }


  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit(): void {}
  

  login() {
    this.router.navigate(['/login']);
  }

  createAccount() {
    return;
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

      const poolData = {
      //  UserPoolId: environment.cognitoUserPoolId, // Your user pool id here
      //  ClientId: environment.cognitoAppClientId // Your client id here
       UserPoolId: "temp", // Your user pool id here
       ClientId: "temp"
     };

     const userPool = new CognitoUserPool(poolData);
     const attributeList = [];

     const formData:formDataInterface = {
       "custom:username": this.username,
       "email": this.email_address,
     }

     for (const key  in formData) {
       const attrData = {
         Name: key,
         Value: formData[key]
       }
       const attribute = new CognitoUserAttribute(attrData);
       attributeList.push(attribute)
     }
     
     userPool.signUp(this.username, this.password, attributeList, [], ( err, result ) => {

      if (err) {
         alert(err.message || JSON.stringify(err));
         return;
       }
       this.router.navigate(['/profile']);

     });
    }
 }
}
