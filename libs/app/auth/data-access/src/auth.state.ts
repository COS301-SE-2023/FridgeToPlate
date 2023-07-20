import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { ChangePassword, Login, Logout, SignUp } from "@fridge-to-plate/app/auth/utils";
import { ShowError } from "@fridge-to-plate/app/error/utils";
import { AuthenticationDetails, CognitoUserAttribute, CognitoUserPool, CognitoUser, CognitoUserSession } from "amazon-cognito-identity-js";
import { CreateNewProfile, IProfile, ResetProfile, RetrieveProfile } from "@fridge-to-plate/app/profile/utils";
import { Navigate } from "@ngxs/router-plugin";
import { environment } from "@fridge-to-plate/app/environments/utils";
import { IPreferences, CreateNewPreferences, ResetPreferences, RetrievePreferences } from "@fridge-to-plate/app/preferences/utils";

import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { AuthService } from "./auth.api";

interface formDataInterface {
    "custom:username": string;
    "email": string;
    [key: string]: string;
  };

export interface AuthStateModel {
    accessGranted: boolean;
}

@State<AuthStateModel>({
    name: 'auth',
    defaults: {
        accessGranted: false
    }
})
@Injectable()
export class AuthState {

  private poolData = {
   UserPoolId: environment.COGNITO_USERPOOL_ID, 
   ClientId: environment.COGNITO_APP_CLIENT_ID
  };
  
  constructor(private store: Store, private api: AuthService) {}

  @Selector()
  getAccessGranted(state: AuthStateModel) {
      return state.accessGranted;
  }

  @Action(SignUp)
  signUp({ setState } : StateContext<AuthStateModel>, { username, email, password } : SignUp) {
      const userPool = new CognitoUserPool(this.poolData);

      const attributeList = [];

      const formData:formDataInterface = {
          "custom:username": username,
          "email": email,
      }

      for (const key  in formData) {
        const attrData = {
            Name: key,
            Value: formData[key]
        }
        const attribute = new CognitoUserAttribute(attrData);
        attributeList.push(attribute);
      }
      
      userPool.signUp(username, password, attributeList, [], ( err, result ) => {
          if (err) {
            this.store.dispatch(new ShowError(err.message || JSON.stringify(err)));
            setState({
              accessGranted: false
            });
            return;
          }
    
          setState({
              accessGranted: true
            });

          const profile : IProfile = {
            displayName: username,
            username: username,
            profilePic: "https://www.pngitem.com/pimgs/m/24-248366_profile-clipart-generic-user-generic-profile-picture-gender.png",
            email: email,
            ingredients: [],
            savedRecipes: [],
            createdRecipes: [],
            currMealPlan: null,
          };

          const preference : IPreferences = {
            username: username,
            darkMode: false,
            recommendNotif: false,
            viewsNotif: false,
            reviewNotif: false,
          };
          
          this.store.dispatch(new CreateNewProfile(profile));
          
          this.store.dispatch(new CreateNewPreferences(preference));
    
          this.store.dispatch(new Navigate(['/recommend']));
      });
  }

  @Action(Login)
  login({ setState } : StateContext<AuthStateModel>, { username, password } : Login) {
    const userPool = new CognitoUserPool(this.poolData);

    const authenticationDetails = new AuthenticationDetails({
        Username: username,
        Password: password,
    });

    const userData = { Username: username, Pool: userPool };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        localStorage.setItem('access_token', result.getAccessToken().getJwtToken());
        localStorage.setItem('id_token', result.getIdToken().getJwtToken());
        localStorage.setItem('refresh_token', result.getRefreshToken().getToken());
        this.store.dispatch(new RetrieveProfile(username));
        this.store.dispatch(new RetrievePreferences(username));
        this.store.dispatch(new Navigate(['/recommend']));
      },
      onFailure: (err) => {
        this.store.dispatch(new ShowError(err.message || JSON.stringify(err)));
        setState({
          accessGranted: false
        });
      },
    });
  }

  @Action(Logout)
  logout({ setState } : StateContext<AuthStateModel>) {
    setState({
      accessGranted: false
    });

    this.store.dispatch(new ResetProfile());
    this.store.dispatch(new ResetPreferences());
    localStorage.clear();
    this.store.dispatch(new Navigate(['/login']));
  }

  @Action(ChangePassword)
  ChangePassword({ setState } : StateContext<AuthStateModel>, { oldPassword, newPassword } : ChangePassword) {

    if(localStorage.getItem("access_token")) {
      const accessToken = localStorage.getItem("access_token");
      const params = {
        PreviousPassword: oldPassword,
        ProposedPassword: newPassword,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        AccessToken: accessToken!,
      };

    const region = 'eu-west-3';
    const cognito = new CognitoIdentityServiceProvider({ region });

      cognito.changePassword(params, (err, data) => {
        if (err) {
          console.error('Password change error:', err);
        } else {
          console.log('Password changed successfully.');
        }
      });
    
    
    }
    
  }
}