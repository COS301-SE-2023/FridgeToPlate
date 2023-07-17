import { Action, Selector, State } from '@ngxs/store';
import { INotification } from '../../utils/src/interfaces';
import { Injectable } from '@angular/core';
import { NotificationsApi } from './notifications.api';

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
  constructor(notificationsApi: NotificationsApi) {}

  @Selector()
  static getGeneralNotifications(state: NotificationsStateModel) {
    return state.generalNotifications;
  }

  @Selector()
  static getRecommendationNotifications(state: NotificationsStateModel) {
    return state.recommendationNotification;
  }
}
