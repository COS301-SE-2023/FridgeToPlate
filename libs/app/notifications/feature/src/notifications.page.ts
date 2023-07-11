import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  INotification,
  NotificationsApi,
} from 'libs/app/notifications/data-access/src/notifications-api';
import { Observable, Subject } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'notifications-page',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class NotificationsPage {
  notifications$: Observable<INotification[]>;

  tabs = [
    { category: 'General', count: 8 },
    { category: 'Recommendations', count: 4 },
  ];

  constructor(
    private location: Location,
    private notificationsApi: NotificationsApi,
    private router: Router
  ) {
    this.notifications$ = this.notificationsApi.getAllNotifications('');
  }

  onNotificationClick(recipeId: string): void {
    this.router.navigate([`recipe/${recipeId}`]);
  }

  goBack() {
    this.location.back();
  }

  clearAllNotifications(clearType: string) {
    if (clearType.includes('general')) {
      const clearObservable = new Subject<INotification[]>();
      //TODO: added when RxJS is implemented.
    } else {
      return;
    }
  }
}
