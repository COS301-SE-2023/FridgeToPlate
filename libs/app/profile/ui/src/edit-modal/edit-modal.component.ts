import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css'],
})
export class EditModalComponent {
  @Output() closeFunc: EventEmitter<any> = new EventEmitter();
  @Output() saveFunc: EventEmitter<any> = new EventEmitter();
  @Input() profile: any;

  close() {
    this.closeFunc.emit();
  }

  save() {
    this.saveFunc.emit();
    this.closeFunc.emit();
  }
}
