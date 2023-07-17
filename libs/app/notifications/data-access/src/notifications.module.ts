import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsApi } from './notifications.api';

@NgModule({
  imports: [CommonModule],
  providers: [NotificationsApi]
})
export class NotificationsDataAccessModule {}