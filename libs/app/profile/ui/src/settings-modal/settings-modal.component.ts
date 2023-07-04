import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss'],
})
export class SettingsModalComponent {
  @Output() closeFunc: EventEmitter<any> = new EventEmitter();
  @Output() saveFunc: EventEmitter<any> = new EventEmitter();
  @Input() editableProfile: any;

  close() {
    this.closeFunc.emit();
  }

  save() {
    this.saveFunc.emit();
    var presentTheme = localStorage.getItem('theme');
    localStorage.setItem('theme', presentTheme === 'theme-light' ? 'theme-dark' : 'theme-light');
  }
}
