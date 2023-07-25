import { Component} from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})

export class ConfirmModalComponent {

  constructor(private store: Store) { }
  
  goLogin() {
    this.store.dispatch(new Navigate(['/login']));  
  }

}
