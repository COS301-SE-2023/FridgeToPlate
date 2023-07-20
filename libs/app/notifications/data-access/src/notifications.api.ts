import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  INotification,
  INotificationResponse,
} from '@fridge-to-plate/app/notifications/utils';

@Injectable({
  providedIn: 'root',
})
export class NotificationsApi {
  data: INotification[] = [
    {
      userName: 'Ryan T.',
      profilePictureUrl:
        'http://fastly.picsum.photos/id/201/400/400.jpg?hmac=FBmAp8pCOKUpdMCB7bMbP_Gnk_EFZscbJ96EoKV--aE',
      comment: 'Interesting combination but we loved it at home.',
      recipeId: 'b6df9e16-4916-4869-a7d9-eb0293142f1f',
    },
    {
      userName: 'Paul P.',
      profilePictureUrl:
        'http://fastly.picsum.photos/id/201/400/400.jpg?hmac=FBmAp8pCOKUpdMCB7bMbP_Gnk_EFZscbJ96EoKV--aE',
      comment: 'Good stuff!',
      recipeId: 'b6df9e16-4916-4869-a7d9-eb0293142f1f',
    },
    {
      userName: 'Azola L.',
      profilePictureUrl:
        'http://fastly.picsum.photos/id/201/400/400.jpg?hmac=FBmAp8pCOKUpdMCB7bMbP_Gnk_EFZscbJ96EoKV--aE',
      comment: 'Tastes amazing, never knew you could flavor lamb like that!',
      recipeId: 'b6df9e16-4916-4869-a7d9-eb0293142f1f',
    },
    {
      userName: 'Simphiwe N.',
      profilePictureUrl:
        'http://fastly.picsum.photos/id/201/400/400.jpg?hmac=FBmAp8pCOKUpdMCB7bMbP_Gnk_EFZscbJ96EoKV--aE',
      comment: 'Needs more salt',
      recipeId: 'b6df9e16-4916-4869-a7d9-eb0293142f1f',
    },
    {
      userName: 'Ryan T.',
      profilePictureUrl:
        'http://fastly.picsum.photos/id/201/400/400.jpg?hmac=FBmAp8pCOKUpdMCB7bMbP_Gnk_EFZscbJ96EoKV--aE',
      comment: 'Interesting combination but we loved it at home.',
      recipeId: 'b6df9e16-4916-4869-a7d9-eb0293142f1f',
    },
    {
      userName: 'Paul P.',
      profilePictureUrl:
        'http://fastly.picsum.photos/id/201/400/400.jpg?hmac=FBmAp8pCOKUpdMCB7bMbP_Gnk_EFZscbJ96EoKV--aE',
      comment: 'Good stuff!',
      recipeId: 'b6df9e16-4916-4869-a7d9-eb0293142f1f',
    },
    {
      userName: 'Azola L.',
      profilePictureUrl:
        'http://fastly.picsum.photos/id/201/400/400.jpg?hmac=FBmAp8pCOKUpdMCB7bMbP_Gnk_EFZscbJ96EoKV--aE',
      comment: 'Tastes amazing, never knew you could flavor lamb like that!',
      recipeId: 'b6df9e16-4916-4869-a7d9-eb0293142f1f',
    },
    {
      userName: 'Simphiwe N.',
      profilePictureUrl:
        'http://fastly.picsum.photos/id/201/400/400.jpg?hmac=FBmAp8pCOKUpdMCB7bMbP_Gnk_EFZscbJ96EoKV--aE',
      comment: 'Needs more salt',
      recipeId: 'b6df9e16-4916-4869-a7d9-eb0293142f1f',
    },
  ];

  getAllNotifications(userId: string): Observable<INotificationResponse> {
    const notificationApiResponse: INotificationResponse = {
      general: this.data,
      recommendations: this.data,
    };
    return new BehaviorSubject(notificationApiResponse);
  }
}
