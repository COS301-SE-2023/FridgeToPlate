import { Component } from '@angular/core';

@Component({
  selector: 'fridge-to-plate-notifications-page',
  templateUrl: './notifications-page.component.html',
  styleUrls: ['./notifications-page.component.css']
})
export class NotificationsPageComponent {
  tabs = [{ category: 'General', count: 8}, { category: 'Recommendations', count: 4}];
}
