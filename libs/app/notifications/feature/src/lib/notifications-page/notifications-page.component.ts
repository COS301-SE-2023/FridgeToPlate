import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  INotification,
  NotificationsApi,
} from 'libs/app/notifications/data-access/src/notifications-api';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'fridge-to-plate-notifications-page',
  templateUrl: './notifications-page.component.html',
  styleUrls: ['./notifications-page.component.css'],
})
export class NotificationsPageComponent {
  notifications$: Observable<INotification[]>;

  tabs = [
    { category: 'General', count: 8 },
    { category: 'Recommendations', count: 4 },
  ];

  constructor(
    private notificationsApi: NotificationsApi,
    private router: Router
  ) {
    this.notifications$ = this.notificationsApi.getAllNotifications('');
  }

  onNotificationClick(recipeId: string): void {
    this.router.navigate([`recipe/${recipeId}`]);
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
