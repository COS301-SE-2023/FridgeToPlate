import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import {
  ChangePassword,
  Login,
  Logout,
  SignUp,
  Forgot,
  NewPassword,
  ChangeEmail,
} from '@fridge-to-plate/app/auth/utils';
import { ShowError } from '@fridge-to-plate/app/error/utils';
import { ShowInfo, ShowSuccess } from '@fridge-to-plate/app/info/utils';
import {
  AuthenticationDetails,
  CognitoUserAttribute,
  CognitoUserPool,
  CognitoUser,
} from 'amazon-cognito-identity-js';
import {
  CreateNewProfile,
  IProfile,
  ResetProfile,
  RetrieveProfile,
} from '@fridge-to-plate/app/profile/utils';
import { Navigate } from '@ngxs/router-plugin';
import { environment } from '@fridge-to-plate/app/environments/utils';
import {
  IPreferences,
  CreateNewPreferences,
  ResetPreferences,
  RetrievePreferences,
} from '@fridge-to-plate/app/preferences/utils';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { ConfirmForgotPasswordRequest } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import {
  ClearRecommend,
  GetUpdatedRecommendation,
  IRecipePreferences,
  IRecommend,
  SetRecommend,
} from '@fridge-to-plate/app/recommend/utils';

interface formDataInterface {
  'custom:username': string;
  email: string;
  [key: string]: string;
}

export interface AuthStateModel {
  accessToken: string;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    accessToken: 'none',
  },
})
@Injectable()
export class AuthState {
  private poolData = {
    UserPoolId: environment.COGNITO_USERPOOL_ID,
    ClientId: environment.COGNITO_APP_CLIENT_ID,
  };

  constructor(private store: Store) {}

  @Selector()
  getAccessToken(state: AuthStateModel) {
    return state.accessToken;
  }

  @Action(SignUp)
  async signUp(
    { setState }: StateContext<AuthStateModel>,
    { username, email, password }: SignUp
  ) {
    const userPool = new CognitoUserPool(this.poolData);

    const attributeList = [];

    const formData: formDataInterface = {
      'custom:username': username,
      email: email,
    };

    for (const key in formData) {
      const attrData = {
        Name: key,
        Value: formData[key],
      };
      const attribute = new CognitoUserAttribute(attrData);
      attributeList.push(attribute);
    }

    await userPool.signUp(username, password, attributeList, [], (err, result) => {
      if (err) {
        this.store.dispatch(new ShowError("Unable to signup"));
        setState({
          accessToken: 'none',
        });
        return;
      }

      setState({
        accessToken:
          result?.user.getSignInUserSession()?.getAccessToken().getJwtToken() ||
          'none',
      });

      const profile: IProfile = {
        displayName: username,
        username: username,
        profilePic: 'https://ionicframework.com/docs/img/demos/avatar.svg',
        email: email,
        ingredients: [],
        savedRecipes: [],
        createdRecipes: [],
        currMealPlan: {
          username: username,
          date: new Date().toISOString().slice(0, 10),
          breakfast: null,
          lunch: null,
          dinner: null,
          snack: null,
        },
      };

      const preference: IPreferences = {
        username: username,
        darkMode: false,
        recommendNotif: true,
        viewsNotif: true,
        reviewNotif: true,
      };

      const defaultRecommend: IRecommend = {
        username: username,
        ingredients: [],
        recipePreferences: { 
          difficulty: '',
          meal: '',
          keywords: [],
          prepTime: '',
          rating: '',
          servings: '',
        }
      };

      this.store.dispatch(new CreateNewProfile(profile));

      this.store.dispatch(new CreateNewPreferences(preference));

      this.store.dispatch(new SetRecommend(defaultRecommend));

      this.store.dispatch(new ShowSuccess("Successfully Created An Account"));

      this.store.dispatch(new Navigate(['/home']));
    });
  }

  @Action(Login)
  async login(
    { setState }: StateContext<AuthStateModel>,
    { username, password }: Login
  ) {
    const userPool = new CognitoUserPool(this.poolData);

    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });

    const userData = { Username: username, Pool: userPool };
    const cognitoUser = new CognitoUser(userData);
    await cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        setState({
          accessToken: result.getAccessToken().getJwtToken(),
        });
        this.store.dispatch(new RetrieveProfile(username));
        this.store.dispatch(new RetrievePreferences(username));
        this.store.dispatch(new GetUpdatedRecommendation(username));
        this.store.dispatch(new Navigate(['/home']));
      },
      onFailure: (err) => {
        this.store.dispatch(new ShowError("Unsuccessful"));
        setState({
          accessToken: 'none',
        });
      },
    });
  }

  @Action(Logout)
  logout({ setState }: StateContext<AuthStateModel>) {
    setState({
      accessToken: 'none',
    });

    this.store.dispatch(new ResetProfile());
    this.store.dispatch(new ResetPreferences());
    this.store.dispatch(new ClearRecommend());
    localStorage.clear();
    this.store.dispatch(new ShowInfo("Account Has Logged Out"));
    this.store.dispatch(new Navigate(['/login']));
  }

  @Action(ChangePassword)
  ChangePassword(
    { getState }: StateContext<AuthStateModel>,
    { oldPassword, newPassword }: ChangePassword
  ) {
    if (getState().accessToken != 'none') {
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
          this.store.dispatch(new ShowError("An Error Occurred When Changing Password"));
        } else {
          this.store.dispatch(new ShowSuccess("Password Changed Successfully"));
        }
      });
    }
  }

  @Action(Forgot)
  forgot({ setState }: StateContext<AuthStateModel>, { username }: Forgot) {
    const params = {
      ClientId: environment.COGNITO_APP_CLIENT_ID, // Your client id here
      Username: username,
    };

    try {
      // Initiate the password reset
      const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider(
        { region: 'eu-west-3' }
      );
      cognitoIdentityServiceProvider.forgotPassword(params).promise();

      // Password reset initiated successfully, redirect the user to a confirmation page
      localStorage.setItem('username', username);
      this.store.dispatch(new Navigate(['/forgot/verification']));
      // (You can handle the confirmation page in your frontend application)
      console.log('Password reset initiated successfully');
    } catch (error) {
      // Handle errors
      this.store.dispatch(new ShowError('Could Not Send Verification Code'));
      console.error('Error initiating password reset:', error);
    }
  }

  @Action(NewPassword)
  NewPassword(
    { getState }: StateContext<AuthStateModel>,
    { verificationCode, newPassword }: NewPassword
  ) {
    const region = 'eu-west-3';

    const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider({
      region,
    });

    const cognito = new CognitoIdentityServiceProvider({ region: 'eu-west-3' });

    try {
      const params: ConfirmForgotPasswordRequest = {
        ClientId: environment.COGNITO_APP_CLIENT_ID,
        ConfirmationCode: verificationCode,
        Username: localStorage.getItem('username') || '',
        Password: newPassword,
      };

      cognito.confirmForgotPassword(params).promise();
      console.log('Password successfully reset.');
      this.store.dispatch(new Navigate(['/forgot/confirm']));
    } catch (err) {
      console.error('Error confirming forgotten password:', err);
      this.store.dispatch(new ShowError('Could Not Confirm New Password'));
      throw err;
    }
  }

  @Action(ChangeEmail)
  changeEmail({ getState }: StateContext<AuthStateModel>, { newEmail }: ChangeEmail) {
    if (getState().accessToken != 'none') {
      const accessToken = getState().accessToken;
      const params = {
        AccessToken: accessToken,
        UserAttributes: [
          {
            Name: 'email',
            Value: newEmail,
          },
        ],
      };

      const region = 'eu-west-3';
      const cognito = new CognitoIdentityServiceProvider({ region });

      cognito.updateUserAttributes(params, (err, data) => {
        if (err) {
          this.store.dispatch(new ShowError("An Error Occurred When Changing Email"));
        } else {
          this.store.dispatch(new ShowSuccess("Email Changed Successfully"));
        }
      });
    }
  }


}
