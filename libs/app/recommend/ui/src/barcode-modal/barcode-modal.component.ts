import { Component, EventEmitter, Output } from '@angular/core';
import { ShowError } from '@fridge-to-plate/app/error/utils';
import { Store } from '@ngxs/store';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'barcode-modal',
  templateUrl: './barcode-modal.component.html',
  styleUrls: ['./barcode-modal.component.scss'],
})
export class BarcodeModalComponent {
  @Output() closeFunc: EventEmitter<any> = new EventEmitter();

  qrResultString: string;

  constructor(private store: Store) {}

  close() {
    this.closeFunc.emit();
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
  }

  camerasNotFound() {
    this.store.dispatch(new ShowError("No Cameras Found"));
  }
}
