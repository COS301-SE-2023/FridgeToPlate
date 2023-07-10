import {
  AfterContentInit,
  Component,
  ContentChildren,
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

  // tabs = [
  //   { category: 'General', count: 8, active: true },
  //   { category: 'Recommendations', count: 4, active: false },
  // ];
  ngAfterContentInit() {
    console.log(this.tabs);
    const activeTabs = this.tabs.filter((tab) => tab.active);

    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab: TabComponent) {
    this.tabs.toArray().forEach((tab) => (tab.active = false));
    tab.active = true;
  }
}
