import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsApi } from './notifications.api';
import { NgxsModule } from '@ngxs/store';
import { NotificationsState } from './notifications.state';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([NotificationsState])],
  providers: [NotificationsApi],
})
export class NotificationsDataAccessModule {}
