import { Component, Input } from '@angular/core';

@Component({
  selector: 'fridge-to-plate-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css'],
})
export class TabComponent {
  @Input() tabTitle: string | undefined;
  @Input() active = false;
}
