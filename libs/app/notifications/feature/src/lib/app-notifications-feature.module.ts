import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsPageComponent } from './notifications-page/notifications-page.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

@NgModule({
  imports: [CommonModule, NzListModule, NzTabsModule],
  declarations: [
    NotificationsPageComponent
  ],
  exports: [ NotificationsPageComponent ]
})
export class AppNotificationsFeatureModule {}
