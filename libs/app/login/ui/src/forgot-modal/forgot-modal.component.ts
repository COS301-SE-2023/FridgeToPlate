import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ShowError } from '@fridge-to-plate/app/error/utils';
import { Store } from '@ngxs/store';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'forgot-modal',
  templateUrl: './forgot-modal.component.html',
  styleUrls: ['./forgot-modal.component.scss'],
})

export class ForgotModalComponent {

  constructor(private store: Store) {
  }
    
  
  
}
