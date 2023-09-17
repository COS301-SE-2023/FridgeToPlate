import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NewPassword } from '@fridge-to-plate/app/auth/utils';
import { ShowError } from '@fridge-to-plate/app/error/utils';
import { ShowInfo } from '@fridge-to-plate/app/info/utils';
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

  onVerify(){

    if (this.verification_code != "" && this.new_password != "" && this.confirm_password != "") {
      if (this.new_password != this.confirm_password) 
        this.store.dispatch(new ShowInfo("Please Enter Matching Passwords"));
      
      else
        this.store.dispatch(new NewPassword(this.verification_code, this.new_password));
      
    }
  }
  
}
