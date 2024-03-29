import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChangePassword } from '@fridge-to-plate/app/auth/utils';
import { ShowError } from '@fridge-to-plate/app/error/utils';
import { ShowInfo } from '@fridge-to-plate/app/info/utils';
import { Store } from '@ngxs/store';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'password-modal',
  templateUrl: './password-modal.component.html',
  styleUrls: ['./password-modal.component.scss'],
})

export class PasswordModalComponent {
  @Output() closeFunc: EventEmitter<any> = new EventEmitter();
  @Output() saveFunc: EventEmitter<any> = new EventEmitter();

  constructor(private store: Store) {
  }

  oldPassword = "";
  newPassword = "";
  confirmPassword = "";

  close() {
    this.closeFunc.emit();
  }

  save() {

    if(this.newPassword != this.confirmPassword)
    this.store.dispatch( new ShowInfo("Passwords Entered Do Not Match"));
    else{
      this.store.dispatch(new ChangePassword(this.oldPassword, this.newPassword));
      this.saveFunc.emit();
      this.closeFunc.emit();
    }
    
    
  }
}
