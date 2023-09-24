import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProfile } from '@fridge-to-plate/app/profile/utils';

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

  close() {
    this.closeFunc.emit();
  }

  save() {
    this.editableProfile.profilePic = this.profileImage;
    this.saveFunc.emit();
    this.closeFunc.emit();
  }

  onProfileChanged(event: any){
    const file = event.target.files[0];

    const reader = new FileReader();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reader.onload = (e: any) => {
      this.profileImage = e.target.result;
    };

    reader.readAsDataURL(file);
  }
}
