import { Injectable } from "@angular/core";
import { CognitoUserSession } from "amazon-cognito-identity-js";

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {

    loginUser(cognitoObject: CognitoUserSession){
        localStorage.setItem('userCognitoObject', JSON.stringify({
            'access_token': cognitoObject.getAccessToken,
            'id_token': cognitoObject.getIdToken(),
            'refresh_token': cognitoObject.getRefreshToken()
          }));
    }

    logoutUser(){
      localStorage.clear();
  }
    
    isUserLoggedIn(){
        //const credentials = localStorage.getItem('userCognitoObject');

        //TODO: Uncomment for prod.
        // if(!credentials)
        //     return false;
        return true;
    }


  }  

















