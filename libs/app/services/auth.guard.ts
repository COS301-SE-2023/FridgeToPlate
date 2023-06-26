// import { Injectable } from '@angular/core';
// import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
// import { Observable } from 'rxjs';
// import {AuthService} from "../shared/services/auth.service";

// //Code for canActivate sourced from : https://www.telerik.com/blogs/angular-basics-canactivate-introduction-routing-guards
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {

//   constructor(private userAuthService: AuthService, private router: Router) {}
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     if(this.userAuthService.isLoggedIn){
//       return true;
//     }
//     else {
//     return this.router.parseUrl('login');
//     }
//   }

// }
