import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Navigate } from "@ngxs/router-plugin";

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
    if (this.router.url.includes('notifications')) {
      return 'active';
    }
    else {
    return this.router.url.includes(pageName) ? 'active' : 'active';
    }
  }

  openRecommend() {
    this.store.dispatch(new Navigate(['/recommend']));
  }

  openSearch() {
    alert("Search Page Not Implemented");
  }

  openCreate() {
    this.store.dispatch(new Navigate(['/create']));
  }

  openProfile() {
    this.store.dispatch(new Navigate(['/profile']));
  }

}
