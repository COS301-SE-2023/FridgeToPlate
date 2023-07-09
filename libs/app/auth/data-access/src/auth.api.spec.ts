import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.api';
import { CognitoAccessToken, CognitoIdToken, CognitoRefreshToken, CognitoUserSession } from 'amazon-cognito-identity-js';

describe('AuthService Tests', () => {
    let service: AuthService;

    const testCognitoAuth: CognitoUserSession = {
        getIdToken: function (): CognitoIdToken {
            return new CognitoIdToken({ IdToken : "TestToken123"})
        },
        getRefreshToken: function (): CognitoRefreshToken {
            return new CognitoRefreshToken({RefreshToken: "TestRefreshToken123"});
        },
        getAccessToken: function (): CognitoAccessToken {
            return new CognitoAccessToken({AccessToken: "TestAccessToken123"})
        },
        isValid: function (): boolean {
            return true;
        }
    }

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AuthService);
      });

      it('should be created', () => {
        expect(service).toBeTruthy();
      });

      it('should log a user in', async () => {
        service.loginUser(testCognitoAuth);
    
        const stringifiedObject = await JSON.stringify({
            'access_token': testCognitoAuth.getAccessToken,
            'id_token': testCognitoAuth.getIdToken(),
            'refresh_token': testCognitoAuth.getRefreshToken()
        });

        const userObjectInStorage = localStorage.getItem('userCognitoObject');

        expect(userObjectInStorage).toBe(stringifiedObject);
      
    });

      it('should log a user out', () => {
        service.loginUser(testCognitoAuth);
    
        const stringifiedObject = JSON.stringify({
            'access_token': testCognitoAuth.getAccessToken,
            'id_token': testCognitoAuth.getIdToken(),
            'refresh_token': testCognitoAuth.getRefreshToken()
        });

        expect(localStorage.getItem('userCognitoObject')).toBe(stringifiedObject);

        service.logoutUser();

        expect(localStorage.getItem('userCognitoObject')).toBeNull();

      });

      it('should check if a user is logged in', () => {

        service.loginUser(testCognitoAuth);
    
        const stringifiedObject = JSON.stringify(testCognitoAuth);

        expect(service.isUserLoggedIn()).toBe(true);

        
      });
})