import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsPage } from './notifications.page';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { AppNotificationsUiModule } from 'libs/app/notifications/ui/src';

@NgModule({
  imports: [CommonModule, NzListModule, NzTabsModule, AppNotificationsUiModule],
  declarations: [NotificationsPage],
  exports: [NotificationsPage],
})
export class NotificationsFeatureModule {}
