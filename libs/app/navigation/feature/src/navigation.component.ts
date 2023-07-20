import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Navigate } from "@ngxs/router-plugin";
import { ShowError } from '@fridge-to-plate/app/error/utils';

@Component({
  selector: 'navigation-bar',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationBar {
  @Output() notificationsClicked = new EventEmitter<void>();
  @Output() settingsClicked = new EventEmitter<void>();

  constructor(private router: Router, private store: Store) {}

  isActive(pageName: string) {
    const currentUrl = this.router.url;
    const pageUrl = `/${pageName}`;

    return currentUrl === pageUrl ? 'active orange' : '';
  }

  openRecommend() {
    this.store.dispatch(new Navigate(['/recommend']));
  }

  openSearch() {
    this.store.dispatch(new ShowError("Not Yet Implemeneted"));
  }

  openCreate() {
    this.store.dispatch(new Navigate(['/create']));
  }

  openProfile() {
    this.store.dispatch(new Navigate(['/profile']));
  }

}
