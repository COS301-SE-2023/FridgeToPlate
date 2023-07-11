import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Output,
  QueryList,
} from '@angular/core';
import { TabComponent } from '../tab/tab.component';
@Component({
  selector: 'fridge-to-plate-tabbed',
  templateUrl: './tabbed.component.html',
  styleUrls: ['./tabbed.component.css'],
})
export class TabbedComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;

  @Output() clearNotificationsEvent = new EventEmitter<
    'general' | 'recommendations'
  >();

  ngAfterContentInit() {
    const activeTabs = this.tabs.filter((tab) => tab.active);

    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab: TabComponent) {
    this.tabs.toArray().forEach((tab) => (tab.active = false));
    tab.active = true;
  }

  clearNotifications() {
    const currentTab = this.tabs.filter((tab) => tab.active)[0];
    if (currentTab) {
      if (currentTab.tabName?.includes('General'))
        this.clearNotificationsEvent.emit('general');
      else {
        this.clearNotificationsEvent.emit('recommendations');
      }
    }
  }
}
