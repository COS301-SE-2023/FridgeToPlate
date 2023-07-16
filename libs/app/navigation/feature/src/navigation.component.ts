import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'navigation-bar',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationBar {
  @Output() notificationsClicked = new EventEmitter<void>();
  @Output() settingsClicked = new EventEmitter<void>();

  constructor(private router: Router) {}

  // isActive(pageName: string) {
  //   if (this.router.url.includes('notifications')) {
  //     return '';
  //   }
  //   else {
  //   return this.router.url.includes(pageName) ? 'active' : '';
  //   }
  // }

  isActive(pageName: string) {
    if (pageName === 'profile') {
      return this.router.url.includes(pageName) ? 'active' : '';
    } else {
      return this.router.url.includes(pageName) ? 'active' : '';
    }
  }
}
