import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ingredient-card',
  templateUrl: './ingredient-card.component.html',
  styleUrls: ['./ingredient-card.component.scss'],
})
export class IngredientCardComponent {
  @Input() ingredient !: IIngredient;
  @Output() removeEvent: EventEmitter<any> = new EventEmitter();

  remove() {
    this.removeEvent.emit();
  }
}
