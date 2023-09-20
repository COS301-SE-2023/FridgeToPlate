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
import { ShowInfo } from '@fridge-to-plate/app/info/utils';

export interface NotificationsStateModel {
  generalNotifications: INotification[] | null;
  recommendationNotification: INotification[] | null;
}
@State<NotificationsStateModel>({
  name: 'notifications',
  defaults: {
    generalNotifications: [],
    recommendationNotification: [],
  },
})
@Injectable()
export class NotificationsState {
  constructor(private notificationsApi: NotificationsApi, private store: Store ) {}

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
    this.store.dispatch(new ShowInfo('General Notifications Cleared'));
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
    this.store.dispatch(new ShowInfo('Recommendation Notifications Cleared'));
  }
}
