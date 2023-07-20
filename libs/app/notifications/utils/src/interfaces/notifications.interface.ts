export interface INotification {
  userName: string;
  profilePictureUrl: string;
  comment: string;
  recipeId: string;
}

export interface INotificationResponse {
  general: INotification[];
  recommendations: INotification[];
}
