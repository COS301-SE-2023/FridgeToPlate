import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  NotificationsApi,
  RefreshRecommendationNotifications,
} from '@fridge-to-plate/app/notifications/data-access';
import { Observable, Subject } from 'rxjs';
import { Location } from '@angular/common';
import {
  INotification,
  INotificationResponse,
} from '@fridge-to-plate/app/notifications/utils';
import { Select, Store } from '@ngxs/store';
import { NotificationsState } from '../../data-access/src/notifications.state';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'notifications-page',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class NotificationsPage {
  @Select(NotificationsState.getGeneralNotifications)
  notifications$!: Observable<INotificationResponse>;

  tabs = [
    { category: 'General', count: 8 },
    { category: 'Recommendations', count: 4 },
  ];

  constructor(
    private location: Location,
    private notificationsApi: NotificationsApi,
    private router: Router,
    private store: Store
  ) {
    store.dispatch(new RefreshRecommendationNotifications());
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
