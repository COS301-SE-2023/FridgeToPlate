import { Component, OnInit } from "@angular/core";
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationDetails, CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';
import { CognitoIdentityProviderClient, AdminConfirmSignUpCommand } from '@aws-sdk/client-cognito-identity-provider';

//import { environment } from 'src/environments/environment';

interface formDataInterface {
  "custom:username": string;
  "email": string;
  //"password": string;
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

  cognitoClient: CognitoIdentityProviderClient;

  constructor(private router: Router) {
    this.cognitoClient = new CognitoIdentityProviderClient({ region: 'eu-west-3' });
  }

  async confirmUserSignUp(poolId: string, username: string): Promise<void> {
    const command = new AdminConfirmSignUpCommand({
      UserPoolId: poolId,
      Username: username,
    });

    try {
      const response = await this.cognitoClient.send(command);
      console.log('User sign-up confirmed:', response);
    } catch (error) {
      console.error('Error confirming user sign-up:', error);
    }
  }

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
        this.confirmUserSignUp(poolData.UserPoolId, this.username);
         alert(err.message || JSON.stringify(err));
         return;
       }
       this.router.navigate(['/profile']);

     });
    }
 }
}
