import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsPageComponent } from './notifications-page/notifications-page.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { AppNotificationsUiModule } from 'libs/app/notifications/ui/src';

@NgModule({
  imports: [CommonModule, NzListModule, NzTabsModule, AppNotificationsUiModule],
  declarations: [NotificationsPageComponent],
  exports: [NotificationsPageComponent],
})
export class AppNotificationsFeatureModule {}
