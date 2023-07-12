import { Component, OnInit } from "@angular/core";
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { CognitoIdentityCredentials } from "aws-sdk";
declare let AWS: any;
//import { environment } from 'src/environments/environment';

interface formDataInterface {
  "username": string;
  "password": string;
  [key: string]: string;
};

@Component({
  selector: "login-page",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage {

  isLoading: boolean = false;
  email_address: string = "";
  password: string = "";

  constructor(private router: Router) { }

  onSignIn(form: NgForm){
    if (form.valid) {
      this.isLoading = true;
      let authenticationDetails = new AuthenticationDetails({
          Username: this.email_address,
          Password: this.password,
      });
      const poolData = {
        // UserPoolId: environment.cognitoUserPoolId, // Your user pool id here
        // ClientId: environment.cognitoAppClientId // Your client id here
        UserPoolId: "temp", // Your user pool id here
        ClientId: "temp"
      };

      let userPool = new CognitoUserPool(poolData);
      let userData = { Username: this.email_address, Pool: userPool };
      var cognitoUser = new CognitoUser(userData);
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          this.router.navigate(["profile"])
        },
        onFailure: (err) => {
          alert(err.message || JSON.stringify(err));
          this.isLoading = false;
        },
      });
    }
  }
  
  reset() {
    alert("Resetting...");
  }
  
  create() {
    this.router.navigate(["/signup"])
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
}

