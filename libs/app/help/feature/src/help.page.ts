import { Component } from '@angular/core';
import { Store } from '@ngxs/store';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'help-page',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class HelpPage {
  constructor(private store: Store) {}
}
