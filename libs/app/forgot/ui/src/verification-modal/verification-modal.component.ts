import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShowError } from '@fridge-to-plate/app/error/utils';
import { Store } from '@ngxs/store';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'verification-modal',
  templateUrl: './verification-modal.component.html',
  styleUrls: ['./verification-modal.component.scss'],
})

export class VerificationModalComponent {

  constructor(private store: Store) {
  }

  verification_code = "";
  new_password = "";
  confirm_password = "";

  onSignIn(form: NgForm){
    if (form.valid) {
      return;
    }
  }
    
  proceedLogin() {
    return;
  }
  
}
