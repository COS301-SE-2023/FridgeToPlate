import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProfile } from '@fridge-to-plate/app/profile/utils';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss'],
})
export class SettingsModalComponent {
  @Output() closeFunc: EventEmitter<any> = new EventEmitter();
  @Output() saveFunc: EventEmitter<any> = new EventEmitter();
  @Input() editableProfile !: IProfile;

  close() {
    this.closeFunc.emit();
  }

  save() {
    this.saveFunc.emit();
  }
}
