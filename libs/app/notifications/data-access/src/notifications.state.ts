import { Action, Select, Selector, State, StateContext } from '@ngxs/store';
import { INotification } from '../../utils/src/interfaces';
import { Injectable } from '@angular/core';
import { NotificationsApi } from './notifications.api';
import {
  ClearGeneralNotifications,
  ClearRecommendationNotifications,
  RefreshNotifications,
  RefreshRecommendationNotifications,
} from './notifications.actions';
import { ProfileState } from '@fridge-to-plate/app/profile/data-access';
import { IProfile } from '@fridge-to-plate/app/profile/utils';
import { Observable, map, take, tap } from 'rxjs';

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

  @Action(RefreshRecommendationNotifications)
  refreshNotifications(
    ctx: StateContext<NotificationsStateModel>,
    { userId }: RefreshNotifications
  ) {
    this.profile$.pipe(take(1)).subscribe((loggedInUser) => {
      this.notificationsApi
        .getAllNotifications(loggedInUser.username)
        .pipe(take(1))
        .subscribe((notificationsResponse) => {
          ctx.setState({
            generalNotifications: notificationsResponse.general,
            recommendationNotification: notificationsResponse.recommendations,
          });
        });
    });
  }

  @Action(ClearGeneralNotifications)
  clearGeneralNotifications(
    ctx: StateContext<NotificationsStateModel>,
    { userId }: ClearGeneralNotifications
  ) {
    ctx.patchState({
      generalNotifications: []
    })
  }

  @Action(ClearRecommendationNotifications)
  clearRecommendationNotifications(
    ctx: StateContext<NotificationsStateModel>,
    { userId }: ClearRecommendationNotifications
  ) {
    ctx.patchState({
      recommendationNotification: []
    })
  }
}
