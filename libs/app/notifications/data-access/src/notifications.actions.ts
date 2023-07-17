export class RefreshNotifications {
  static readonly type = '[Notifications] Refresh Notifications';
  constructor(public readonly userId: string) {}
}

export class RefreshGeneralNotifications {
  static readonly type = '[Notifications] Refresh General Notifications';
  constructor() {}
}

export class RefreshRecommendationNotifications {
  static readonly type = '[Notifications] Refresh Recommendation Notifications';
  constructor() {}
}

export class ClearNotifications {
  static readonly type = '[Notifications] Clear Notifications';
  constructor(public readonly userId: string) {}
}
