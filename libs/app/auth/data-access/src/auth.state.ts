import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { ChangePassword, Login, Logout, SignUp, Forgot, NewPassword } from "@fridge-to-plate/app/auth/utils";
import { ShowError } from "@fridge-to-plate/app/error/utils";
import { AuthenticationDetails, CognitoUserAttribute, CognitoUserPool, CognitoUser } from "amazon-cognito-identity-js";
import { CreateNewProfile, IProfile, ResetProfile, RetrieveProfile } from "@fridge-to-plate/app/profile/utils";
import { Navigate } from "@ngxs/router-plugin";
import { environment } from "@fridge-to-plate/app/environments/utils";
import { IPreferences, CreateNewPreferences, ResetPreferences, RetrievePreferences } from "@fridge-to-plate/app/preferences/utils";
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { ConfirmForgotPasswordRequest } from 'aws-sdk/clients/cognitoidentityserviceprovider';



interface formDataInterface {
    "custom:username": string;
    "email": string;
    [key: string]: string;
  };

export interface AuthStateModel {
    accessGranted: boolean;
    accessToken: string;
}

@State<AuthStateModel>({
    name: 'auth',
    defaults: {
        accessGranted: false,
        accessToken: "none"
    }
})
@Injectable()
export class AuthState {

  private poolData = {
   UserPoolId: environment.COGNITO_USERPOOL_ID, 
   ClientId: environment.COGNITO_APP_CLIENT_ID
  };
  

  constructor(private store: Store) {}

  @Selector()
  getAccessGranted(state: AuthStateModel) {
      return state.accessGranted;
  }

  @Selector()
  getAccessToken(state: AuthStateModel) {
      return state.accessToken;
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
              accessGranted: false,
              accessToken: "none"
            });
            return;
          }
    
          setState({
              accessGranted: true,
              accessToken: result?.user.getSignInUserSession()?.getAccessToken().getJwtToken() || 'none'
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
        setState({
          accessGranted: true,
          accessToken: result.getAccessToken().getJwtToken()
        });
        this.store.dispatch(new RetrieveProfile(username));
        this.store.dispatch(new RetrievePreferences(username));
        this.store.dispatch(new Navigate(['/recommend']));
      },
      onFailure: (err) => {
        this.store.dispatch(new ShowError(err.message || JSON.stringify(err)));
        setState({
          accessGranted: false,
          accessToken: "none"
        });
      },
    });
  }

  @Action(Logout)
  logout({ setState } : StateContext<AuthStateModel>) {
    setState({
      accessGranted: false,
      accessToken: "none"
    });

    this.store.dispatch(new ResetProfile());
    this.store.dispatch(new ResetPreferences());
    localStorage.clear();
    this.store.dispatch(new Navigate(['/login']));
  }

  @Action(ChangePassword)
  ChangePassword({ getState } : StateContext<AuthStateModel>, { oldPassword, newPassword } : ChangePassword) {

    if(getState().accessToken != "none") {
      const accessToken = getState().accessToken;
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

  @Action(Forgot)
   forgot({ setState } : StateContext<AuthStateModel>, { username } : Forgot) {
    
    const params = {
      ClientId: environment.COGNITO_APP_CLIENT_ID, // Your client id here
      Username: username,
    };
  
    try {
      // Initiate the password reset
      const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider(({ region: "eu-west-3" }));
      cognitoIdentityServiceProvider.forgotPassword(params).promise();

      // Password reset initiated successfully, redirect the user to a confirmation page
      localStorage.setItem("username", username);
      this.store.dispatch(new Navigate(['/forgot/verification']));
      // (You can handle the confirmation page in your frontend application)
      console.log('Password reset initiated successfully');
    } catch (error) {
      // Handle errors
      this.store.dispatch( new ShowError("Could Not Send Verification Code"));
      console.error('Error initiating password reset:', error);
    }
  }

  @Action(NewPassword)
  NewPassword({ getState } : StateContext<AuthStateModel>, { verificationCode, newPassword } : NewPassword) {

    const region = "eu-west-3";

    const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider({ region });

    const cognito = new CognitoIdentityServiceProvider({ region: "eu-west-3" });


    try {
      const params: ConfirmForgotPasswordRequest = {
        ClientId: environment.COGNITO_APP_CLIENT_ID,
        ConfirmationCode: verificationCode,
        Username: localStorage.getItem("username") || '',
        Password: newPassword,
      };
  
      cognito.confirmForgotPassword(params).promise();
      console.log('Password successfully reset.');
      this.store.dispatch(new Navigate(['/forgot/confirm']));  
    } catch (err) {
      console.error('Error confirming forgotten password:', err);
      this.store.dispatch( new ShowError("Could Not Confirm New Password"));
      throw err;
    }
    
    
    
  }

}