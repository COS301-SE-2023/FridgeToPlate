import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsPageComponent } from './notifications-page/notifications-page.component';
import { NzListModule } from 'ng-zorro-antd/list';

@NgModule({
  imports: [CommonModule, RoutingMo],
  declarations: [
    NotificationsPageComponent
  ],
})
export class AppNotificationsFeatureModule {}
