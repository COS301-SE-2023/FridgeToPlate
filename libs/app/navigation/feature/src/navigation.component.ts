import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Navigate } from "@ngxs/router-plugin";
// import { ShowError } from '@fridge-to-plate/app/error/utils';

@Component({
  selector: 'navigation-bar',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationBar {

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

}
