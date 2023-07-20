import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { ChangePassword, Login, Logout, SignUp } from "@fridge-to-plate/app/auth/utils";
import { ShowError } from "@fridge-to-plate/app/error/utils";
import { AuthenticationDetails, CognitoUserAttribute, CognitoUserPool, CognitoUser } from "amazon-cognito-identity-js";
import { CreateNewProfile, IProfile, ResetProfile, RetrieveProfile } from "@fridge-to-plate/app/profile/utils";
import { Navigate } from "@ngxs/router-plugin";

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
  //  UserPoolId: environment.cognitoUserPoolId, // Your user pool id here
  //  ClientId: environment.cognitoAppClientId // Your client id here
      UserPoolId: "temp", // Your user pool id here
      ClientId: "temp"
  };
  
  constructor(private store: Store) {}

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
          
          this.store.dispatch(new CreateNewProfile(profile));
    
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
        this.store.dispatch(new RetrieveProfile(username));
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
    this.store.dispatch(new Navigate(['/login']));
  }

  @Action(ChangePassword)
  ChangePassword({ setState } : StateContext<AuthStateModel>, { oldPassword, newPassword } : ChangePassword) {

    return;
  }
}