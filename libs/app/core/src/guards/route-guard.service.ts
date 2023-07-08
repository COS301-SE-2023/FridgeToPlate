import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'libs/app/auth/data-access/src/auth.api';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  canActivate(){
    if(this.authService.isUserLoggedIn()){
      return true;
    }
    else {
    return this.router.parseUrl('login');
    }
  }
}
