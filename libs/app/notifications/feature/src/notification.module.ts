import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsPage } from './notifications.page';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NotificationsUiModule } from '@fridge-to-plate/app/notifications/ui';
import { NotificationsRouting } from './notifications.routing';
import { NavigationBarModule } from '@fridge-to-plate/app/navigation/feature';

@NgModule({
  imports: [
    CommonModule, 
    NzListModule, 
    NzTabsModule, 
    NotificationsUiModule, 
    NotificationsRouting,
    NavigationBarModule,
  ],
  declarations: [NotificationsPage],
  exports: [NotificationsPage],
})
export class NotificationsFeatureModule {}
