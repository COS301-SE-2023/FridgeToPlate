import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  INotification,
  INotificationResponse,
} from '@fridge-to-plate/app/notifications/utils';
import { HttpClient } from '@angular/common/http';
import { environment } from '@fridge-to-plate/app/environments/utils';

@Injectable({
  providedIn: 'root',
})
export class NotificationsApi {
  private baseUrl = environment.API_URL + '/notifications';

  constructor(private http: HttpClient) {}

  getAllNotifications(userId: string): Observable<INotificationResponse> {
    const url = `${this.baseUrl}/${userId}`;

    return this.http.get<INotificationResponse>(url);
  }

  clearAllNotifications(userId: string): Observable<string> {
    const url = `${this.baseUrl}/clear/${userId}`;

    return this.http.delete<string>(url);
  }

  clearGeneralNotifications(userId: string): Observable<string> {
    const url = `${this.baseUrl}/clear/${userId}/general`;

    return this.http.delete<string>(url);
  }

  clearRecommendationNotifications(userId: string): Observable<string> {
    const url = `${this.baseUrl}/clear/${userId}/recommendation`;

    return this.http.delete<string>(url);
  }

  deleteNotification(notificationId: string): Observable<string> {
    const url = `${this.baseUrl}/${notificationId}`;

    return this.http.delete<string>(url);
  }
}
