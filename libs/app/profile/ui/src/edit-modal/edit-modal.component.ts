import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css'],
})
export class EditModalComponent {
  @Output() closeFunc: EventEmitter<any> = new EventEmitter();
  
  close() {
    this.closeFunc.emit();
  }
}
