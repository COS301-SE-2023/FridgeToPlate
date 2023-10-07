import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChangeEmail } from '@fridge-to-plate/app/auth/utils';
import { ShowError, ShowSuccess } from '@fridge-to-plate/app/info/utils';
import { IProfile } from '@fridge-to-plate/app/profile/utils';
import { Store } from '@ngxs/store';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent {
  @Output() closeFunc: EventEmitter<any> = new EventEmitter();
  @Output() saveFunc: EventEmitter<any> = new EventEmitter();
  @Input() editableProfile !: IProfile;
  profileImage : string;

  constructor(private store : Store) {}

  close() {
    this.closeFunc.emit();
  }

  save() {
    if(this.profileImage){
      this.editableProfile.profilePic = this.profileImage;
    }


    if(!this.validateEmail()){
      this.store.dispatch(new ShowError("Invalid Email"));
      return;  
    }
    this.saveFunc.emit();
    this.closeFunc.emit();
  }

  onProfileChanged(event: any){
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      reader.onload = (e: any) => {
        this.profileImage = e.target.result;
        this.store.dispatch( new ShowSuccess("Image Successfully Chosen"));
      };

      reader.readAsDataURL(file);
    }

  }

 validateEmail(): boolean {
  const email: string = this.editableProfile.email;
  const emailRegex  = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
  return emailRegex.test(email);
}


}
