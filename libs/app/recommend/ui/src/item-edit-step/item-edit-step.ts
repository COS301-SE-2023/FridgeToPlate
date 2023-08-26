import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';
import { AddIngredient, RemoveIngredient } from '@fridge-to-plate/app/recommend/utils';
import { Select, Store } from '@ngxs/store';
import { RecommendState } from '@fridge-to-plate/app/recommend/data-access';
import {Observable } from 'rxjs';
import { BarcodeScannerLivestreamComponent } from 'ngx-barcode-scanner';
import { QuaggaJSResultObject } from '@ericblade/quagga2';

@Component({
  selector: 'item-edit-step',
  templateUrl: './item-edit-step.html',
  styleUrls: ['item-edit-step.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class ItemEditStep implements AfterViewInit {

  order = '';
  ingredientName = '';
  ingredientAmount = 1;
  ingredientScale = '';

  @ViewChild(BarcodeScannerLivestreamComponent)
  barcodeScanner: BarcodeScannerLivestreamComponent;

  torch = false;
  barcodeValue: any;
  scannerOpened = true;

  @Select(RecommendState.getIngredients) ingredients$ !: Observable<IIngredient[]>;
  
  constructor(private store: Store) {}

  ngAfterViewInit() {
    this.barcodeScanner.start();
  }

  onValueChanges(result: QuaggaJSResultObject) {
    this.barcodeValue = result.codeResult.code;
    alert(this.barcodeScanner);
  }

  onStarted(event: any): void {
    console.log('started', event);
}

  removeItem(deleteItem: IIngredient) {
    this.store.dispatch(new RemoveIngredient(deleteItem));
  }

  addIngredient() {
    const testIngredient: IIngredient = {
      name: this.ingredientName,
      amount: this.ingredientAmount as number,
      unit: this.ingredientScale
    }
    
    this.store.dispatch(new AddIngredient(testIngredient));
  }

  closeScanner() {
    this.scannerOpened = false;
  }

  openScanner() {
    this.scannerOpened = true;
  }
}