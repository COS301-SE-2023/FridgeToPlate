import {
  Action,
  NgxsModule,
  Select,
  Selector,
  State,
  StateContext,
  Store,
} from '@ngxs/store';
import { INotification } from '@fridge-to-plate/app/notifications/utils';
import { Injectable } from '@angular/core';
import { NotificationsApi } from './notifications.api';
import {
  ClearRecommendationNotifications,
  RefreshNotifications,
  RefreshRecommendationNotifications,
  ClearGeneralNotifications,
} from '@fridge-to-plate/app/notifications/utils';
import { ProfileState } from '@fridge-to-plate/app/profile/data-access';
import { IProfile } from '@fridge-to-plate/app/profile/utils';
import { Observable, take } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { NotificationsDataAccessModule } from './notifications.module';

export interface NotificationsStateModel {
  generalNotifications: INotification[] | null;
  recommendationNotification: INotification[] | null;
}
@State<NotificationsStateModel>({
  name: 'notifications',
  defaults: {
    generalNotifications: [],
    recommendationNotification: [
      {
        userId: 'JohnDoe',
        notificationPic: '/assets/Fridge Logo Transparent.png',
        title: 'Pure authentic Italian Dish',
        metadata: 'b6df9e16-4916-4869-a7d9-eb0293142f1f',
        type: 'recommendation',
        notificationId: '280e3937-0447-40d6-ac43-d089495932ba',
      },
      {
        userId: 'BobtheBuilder',
        notificationPic: '/assets/Fridge Logo Transparent.png',
        title: 'Pure authentic Italian Dish',
        body: 'The dish is good if you have no choice',
        metadata: 'b6df9e16-4916-4869-a7d9-eb0293142f1f',
        type: 'recommendation',
        notificationId: '280e3937-0447-40d6-ac43-d089495932ba',
      },
    ],
  },
})
@Injectable()
export class NotificationsState {
  constructor(private notificationsApi: NotificationsApi) {}

  @Select(ProfileState.getProfile) profile$!: Observable<IProfile>;

  @Selector()
  static getGeneralNotifications(state: NotificationsStateModel) {
    return state.generalNotifications;
  }

  @Selector()
  static getRecommendationNotifications(state: NotificationsStateModel) {
    return state.recommendationNotification;
  }

  @Action(RefreshNotifications)
  refreshNotifications(
    { patchState }: StateContext<NotificationsStateModel>,
    { userId }: RefreshNotifications
  ) {
    this.notificationsApi
      .getAllNotifications(userId)
      .pipe(take(1))
      .subscribe((notificationsResponse) => {
        patchState({
          generalNotifications: notificationsResponse.general,
          recommendationNotification: notificationsResponse.recommendations,
        });
      });
  }

  @Action(ClearGeneralNotifications)
  clearGeneralNotifications(
    { patchState }: StateContext<NotificationsStateModel>,
    { userId }: ClearGeneralNotifications
  ) {
    patchState({
      generalNotifications: [],
    });

    this.notificationsApi.clearGeneralNotifications(userId).subscribe();
  }

  @Action(ClearRecommendationNotifications)
  clearRecommendationNotifications(
    { patchState }: StateContext<NotificationsStateModel>,
    { userId }: ClearRecommendationNotifications
  ) {
    patchState({
      recommendationNotification: [],
    });

    this.notificationsApi.clearRecommendationNotifications(userId).subscribe();
  }
}
