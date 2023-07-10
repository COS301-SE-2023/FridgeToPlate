import { Component } from '@angular/core';

@Component({
  selector: 'fridge-to-plate-tabbed',
  templateUrl: './tabbed.component.html',
  styleUrls: ['./tabbed.component.css'],
})
export class TabbedComponent {
  selectTab(_t5: { category: string; count: number; active: boolean }) {
    throw new Error('Method not implemented.');
  }
  tabs = [
    { category: 'General', count: 8, active: true },
    { category: 'Recommendations', count: 4, active: false },
  ];
}
