import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'shopping-list-modal',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css'],
})
export class ShoppinglistComponent {

  @Output() closeFunc: EventEmitter<any> = new EventEmitter();
  @Output() openFunc: EventEmitter<any> = new EventEmitter();
  @Input() ingredients: IIngredient[] | null;
  @Input() username: string; 

  close() { 
    this.closeFunc.emit();
  }

}
