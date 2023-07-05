import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProfile } from '@fridge-to-plate/app/profile/utils';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css'],
})
export class EditModalComponent {
  @Output() closeFunc: EventEmitter<any> = new EventEmitter();
  @Output() saveFunc: EventEmitter<any> = new EventEmitter();
  @Input() editableProfile !: IProfile;

  close() {
    this.closeFunc.emit();
  }

  save() {
    this.saveFunc.emit();
    this.closeFunc.emit();
  }
}
