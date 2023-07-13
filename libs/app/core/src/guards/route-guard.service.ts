import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@fridge-to-plate/app/auth/data-access';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(){
    if(this.authService.isUserLoggedIn()){
      return true;
    }
    else {
      return this.router.parseUrl('login');
    }
  }
}
