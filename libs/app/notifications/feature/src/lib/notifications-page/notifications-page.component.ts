import { Component } from '@angular/core';
import {
  INotification,
  NotificationsApi,
} from 'libs/app/notifications/data-access/src/notifications-api';
import { Observable, switchMap } from 'rxjs';

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

  constructor(private notificationsApi: NotificationsApi) {
    this.notifications$ = this.notificationsApi.getAllNotifications('');
  }
}
