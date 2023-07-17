export class RefreshNotifications {
  static readonly type = '[Notifications] Refresh Notifications';
  constructor(public readonly userId: string) {}
}

export class ClearNotifications {
  static readonly type = '[Notifications] Clear Notifications';
  constructor(public readonly userId: string) {}
}
