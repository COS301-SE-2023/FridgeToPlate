import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Navigate } from "@ngxs/router-plugin";
import { ProfileState } from '@fridge-to-plate/app/profile/data-access';
import { Observable } from 'rxjs';
import { CloseSettings, IProfile, OpenSettings } from '@fridge-to-plate/app/profile/utils';
import { PreferencesState } from '@fridge-to-plate/app/preferences/data-access';
import { IPreferences } from '@fridge-to-plate/app/preferences/utils';
// import { ShowError } from '@fridge-to-plate/app/error/utils';

@Component({
  selector: 'navigation-bar',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationBar {

  @Select(ProfileState.getProfile) profile$ !: Observable<IProfile | null>;
  @Select(PreferencesState.getPreference) preferences$ !: Observable<IPreferences>;

  constructor(public router: Router, private store: Store) {}

  isActive(pageName: string) {
    const currentUrl = this.router.url;
    const pageUrl = `/${pageName}`;

    return currentUrl === pageUrl ? 'active orange' : '';
  }

  openRecommend() {
    this.store.dispatch(new CloseSettings());
    this.store.dispatch(new Navigate(['/recommend']));
  }

  openSearch() {
    this.store.dispatch(new CloseSettings());
    this.store.dispatch(new Navigate(['/search']));
  }

  openCreate() {
    this.store.dispatch(new CloseSettings());
    this.store.dispatch(new Navigate(['/create']));
  }

  openProfile() {
    this.store.dispatch(new CloseSettings());
    this.store.dispatch(new Navigate(['/profile']));
  }

  openNotifications() {
    this.store.dispatch(new CloseSettings());
    this.store.dispatch(new Navigate(['/profile/notifications']));
  }
  
  openHome() {
    this.store.dispatch(new CloseSettings());
    this.store.dispatch(new Navigate(['/home']));
  }
  
  openSignUp() {
    this.store.dispatch(new CloseSettings());
    this.store.dispatch(new Navigate(['/signup']));
  }

  openLogin() {
    this.store.dispatch(new CloseSettings());
    this.store.dispatch(new Navigate(['/login']));
  }

  openSettings() {
    this.store.dispatch(new OpenSettings());

    if (!this.isActive('profile')) {
      this.store.dispatch(new Navigate(['/profile']));
    }
  }

  
}
