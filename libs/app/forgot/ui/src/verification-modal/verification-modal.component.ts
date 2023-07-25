import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NewPassword } from '@fridge-to-plate/app/auth/utils';
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
  username = "";
  new_password = "";
  confirm_password = "";

  onSignIn(form: NgForm){
    if (form.valid) {
      if (this.new_password != this.confirm_password) 
        this.store.dispatch(new ShowError("Please Enter Matching Passwords"));
      else
        this.store.dispatch(new NewPassword(this.verification_code, this.new_password));
    }
  }
  
}
