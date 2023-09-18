import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClearGeneralNotifications, ClearRecommendationNotifications, RefreshNotifications } from '@fridge-to-plate/app/notifications/utils';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { INotification, INotificationResponse } from '@fridge-to-plate/app/notifications/utils';
import { Select, Store } from '@ngxs/store';
import { NotificationsState } from '@fridge-to-plate/app/notifications/data-access';
import { ProfileState } from '@fridge-to-plate/app/profile/data-access';
import { IProfile } from '@fridge-to-plate/app/profile/utils';
import { Navigate } from '@ngxs/router-plugin';

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

  @Select(NotificationsState.getGeneralNotifications)
  generalNotifications$!: Observable<INotification[]>;

  @Select(NotificationsState.getRecommendationNotifications)
  recommendationNotifications$!: Observable<INotification[]>;

  @Select(ProfileState.getProfile)
  profile$!: Observable<IProfile>;

  tabs = [
    { category: 'General', count: 8 },
    { category: 'Recommendations', count: 4 },
  ];
  userID : string;

  constructor(
    private location: Location,
    private store: Store
  ) {

    this.profile$.subscribe( (profile) => {
      this.userID = profile.username;
    });
    
    store.dispatch(new RefreshNotifications(this.userID));
  }

  onNotificationClick(path: string): void {
    this.store.dispatch(new Navigate([path]));
  }

  goBack() {
    this.location.back();
  }

  clearAllNotifications(clearType: string) {
    this.profile$.subscribe((next) => {
      if (clearType.includes('general')) {
        this.store.dispatch(new ClearGeneralNotifications(next.username));
      } else {
        this.store.dispatch(
          new ClearRecommendationNotifications(next.username)
        );
      }
    });
  }
}
