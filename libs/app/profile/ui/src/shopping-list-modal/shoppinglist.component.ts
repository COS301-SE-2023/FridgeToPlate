import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IMealPlan } from '@fridge-to-plate/app/meal-plan/utils';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'shopping-list-modal',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css'],
})
export class ShoppinglistComponent {
  @Output() closeFunc: EventEmitter<any> = new EventEmitter();
  @Output() saveFunc: EventEmitter<any> = new EventEmitter();
  @Input() mealPlan: IMealPlan;

  close() {
    this.closeFunc.emit();
  }

  save() {

    this.saveFunc.emit();
      this.closeFunc.emit();
  }


}
