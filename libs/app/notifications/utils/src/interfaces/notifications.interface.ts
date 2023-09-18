export interface INotification {
  notificationId: string;
  userId: string;
  notificationPic: string;
  title: string;
  body?: string;
  type: string;
  metadata?: string;
}

export interface INotificationResponse {
  general: INotification[];
  recommendations: INotification[];
}
