import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabbedComponent } from './tabbed/tabbed.component';
import { TabComponent } from './tab/tab.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TabbedComponent, TabComponent],
  exports: [TabbedComponent],
})
export class AppNotificationsUiModule {}
