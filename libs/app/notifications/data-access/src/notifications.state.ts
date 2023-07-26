import {
  Action,
  NgxsModule,
  Select,
  Selector,
  State,
  StateContext,
  Store,
} from '@ngxs/store';
import { INotification } from '../../utils/src/interfaces';
import { Injectable } from '@angular/core';
import { NotificationsApi } from './notifications.api';
import {
  ClearGeneralNotifications,
  ClearRecommendationNotifications,
  RefreshNotifications,
  RefreshRecommendationNotifications,
} from '../../utils/notifications.actions';
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

// let store: Store;
//
// beforeEach(() => {
//   TestBed.configureTestingModule({
//     imports: [NgxsModule.forRoot([NotificationsState]), NotificationsDataAccessModule],
//     declarations: []
//   });
//
//   store = TestBed.inject(Store);
// });
