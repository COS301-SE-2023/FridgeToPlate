import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { PreferencesState } from '@fridge-to-plate/app/preferences/data-access';
import { IPreferences } from '@fridge-to-plate/app/preferences/utils';
import { ProfileState } from '@fridge-to-plate/app/profile/data-access';
import { IProfile } from '@fridge-to-plate/app/profile/utils';
import { RecommendState } from '@fridge-to-plate/app/recommend/data-access';
import { IRecommend } from '@fridge-to-plate/app/recommend/utils';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  @Select(ProfileState.getProfile) profile$ !: Observable<IProfile | null>;
  @Select(PreferencesState.getPreference) preferences$ !: Observable<IPreferences | null>;
  @Select(RecommendState.getRecommendRequest) recommend$ !: Observable<IRecommend | null>;

  profile: IProfile | null;
  preferences: IPreferences | null;
  recommend: IRecommend | null;

  constructor(private router: Router) {
    this.profile$.subscribe(stateProfile => this.profile = stateProfile);
    this.preferences$.subscribe(statePreference => this.preferences = statePreference);
    this.recommend$.subscribe(stateRecommend => this.recommend = stateRecommend);
  }

  canActivate(){
    if(this.profile && this.preferences && this.recommend){
      return true;
    } else {
      return this.router.parseUrl('unauthorised');
    }
  }
}
