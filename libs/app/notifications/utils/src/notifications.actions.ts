export class RefreshNotifications {
  static readonly type = '[Notifications] Refresh Notifications';
  constructor(public readonly userId: string) {}
}

export class RefreshGeneralNotifications {
  static readonly type = '[Notifications] Refresh General Notifications';
}

export class RefreshRecommendationNotifications {
  static readonly type = '[Notifications] Refresh Recommendation Notifications';
}

export class ClearGeneralNotifications {
  static readonly type = '[Notifications] Clear General Notifications';
  constructor(public readonly userId: string) {}
}

export class ClearRecommendationNotifications {
  static readonly type = '[Notifications] Clear Recommendation Notifications';
  constructor(public readonly userId: string) {}
}
