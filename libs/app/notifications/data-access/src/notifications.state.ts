import {  Action,  NgxsModule, Select, Selector, State, StateContext, Store } from '@ngxs/store';
import { INotification } from '@fridge-to-plate/app/notifications/utils';
import { Injectable } from '@angular/core';
import { NotificationsApi } from './notifications.api';
import { ClearRecommendationNotifications, RefreshNotifications, RefreshRecommendationNotifications, ClearGeneralNotifications } from '@fridge-to-plate/app/notifications/utils';
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
      userName: "John Doe",
      profilePictureUrl: "",
      comment: "Any",
      recipeId: "Any",
    },
    {
      userName: "Bob Builder",
      profilePictureUrl: "",
      comment: "Any",
      recipeId: "Any",
    }],
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
      this.notificationsApi.getAllNotifications(loggedInUser.username).pipe(take(1)).subscribe((notificationsResponse) => {
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
      generalNotifications: [],
    });

    this.notificationsApi.clearGeneralNotifications(userId).subscribe();
  }

  @Action(ClearRecommendationNotifications)
  clearRecommendationNotifications(
    ctx: StateContext<NotificationsStateModel>,
    { userId }: ClearRecommendationNotifications
  ) {
    ctx.patchState({
      recommendationNotification: [],
    });

    this.notificationsApi.clearRecommendationNotifications(userId).subscribe();
  }
}