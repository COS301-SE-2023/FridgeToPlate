// import { Injectable } from '@angular/core';
// import {AngularFireAuth} from "@angular/fire/compat/auth";
// import {IAuthResult, IUserCredential} from "../../../models/types";
// import {getUserId, isUserAuthenticated, setUserCredentials} from "../../utils/credentials";
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   userData: any;

//   constructor(
//       public angularFireAuth: AngularFireAuth,
//   ) {

//     this.angularFireAuth.authState.subscribe( (user) => {
//       this.userData = user;
//     })

//   }
//   loginUser(email:string, password: string): Promise<IAuthResult> {

//       return this.angularFireAuth.signInWithEmailAndPassword(email, password)
//         .then( (result) => {

//             const userCredentialObject: IUserCredential = {
//                 user_id: result.user?.uid ?? '',
//                 user_JWT: result.user?.getIdTokenResult().then( token => {return token}) ?? ''
//             }

//             const successLoginObject: IAuthResult = {
//                 result: 'success',
//                 additional_info: userCredentialObject
//             }

//             setUserCredentials(successLoginObject.additional_info as IUserCredential);

//             return successLoginObject;
//         }).catch( (error) => {
//             const errorObject: IAuthResult = {
//                 result: 'error',
//                 additional_info: error.message
//             }
//             return errorObject;
//         });
//   }

//   signupUser(email:string,password:string): Promise<IAuthResult> {
//     return this.angularFireAuth.createUserWithEmailAndPassword(email,password)
//         .then( (result) => {

//             const userCredentialObject: IUserCredential = {
//                 user_id: result.user?.uid ?? '',
//                 user_JWT: result.user?.getIdTokenResult().then( token => {return token}) ?? ''
//             }

//             const successSignupObject: IAuthResult = {
//                 result: 'success',
//                 additional_info: userCredentialObject
//             }

//             setUserCredentials(successSignupObject.additional_info as IUserCredential);

//             return successSignupObject;

//         })
//         .catch( (error) => {
//             const errorObject: IAuthResult = {
//                 result: 'error',
//                 additional_info: error.message
//             }
//             return errorObject;
//         })
//   }

//   public get isLoggedIn(){
//       return isUserAuthenticated();
//   }

//   public get userId(){
//         return getUserId();
//   }
// }
