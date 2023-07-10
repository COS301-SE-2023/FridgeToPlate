import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabbedComponent } from './tabbed/tabbed.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TabbedComponent],
  exports: [TabbedComponent],
})
export class AppNotificationsUiModule {}
