import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Navigate } from "@ngxs/router-plugin";
import { ProfileState } from '@fridge-to-plate/app/profile/data-access';
import { Observable } from 'rxjs';
import { IProfile } from '@fridge-to-plate/app/profile/utils';
// import { ShowError } from '@fridge-to-plate/app/error/utils';

@Component({
  selector: 'navigation-bar',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationBar {

  @Select(ProfileState.getProfile) profile$ !: Observable<IProfile | null>;

  constructor(public router: Router, private store: Store) {}

  isActive(pageName: string) {
    const currentUrl = this.router.url;
    const pageUrl = `/${pageName}`;

    return currentUrl === pageUrl ? 'active orange' : '';
  }

  openRecommend() {
    this.store.dispatch(new Navigate(['/recommend']));
  }

  openSearch() {
    // this.store.dispatch(new ShowError("Not Yet Implemeneted"));
    alert("Not Yet Implemeneted");
  }

  openCreate() {
    this.store.dispatch(new Navigate(['/create']));
  }

  openProfile() {
    this.store.dispatch(new Navigate(['/profile']));
  }

  openNotifications() {
    this.store.dispatch(new Navigate(['/profile/notifications']));
  }
  
  openHome() {
    this.store.dispatch(new Navigate(['/home']));
  }
  
  openSignUp() {
    this.store.dispatch(new Navigate(['/signup']));
  }

  openLogin() {
    this.store.dispatch(new Navigate(['/login']));
  }
}
