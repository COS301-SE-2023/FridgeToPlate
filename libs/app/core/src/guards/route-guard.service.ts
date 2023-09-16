import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ProfileState } from '@fridge-to-plate/app/profile/data-access';
import { IProfile } from '@fridge-to-plate/app/profile/utils';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  @Select(ProfileState.getProfile) profile$ !: Observable<IProfile | null>;
  profile: IProfile | null;

  constructor(
    private router: Router
  ) {
    this.profile$.subscribe(stateProfile => this.profile = stateProfile);
  }

  canActivate(){
    if(this.profile){
      return true;
    } else {
      return this.router.parseUrl('unauthorised');
    }
  }
}
