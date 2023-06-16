import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ingredient-card',
  templateUrl: './ingredient-card.component.html',
  styleUrls: ['./ingredient-card.component.scss'],
})
export class IngredientCardComponent {
  @Input() ingredient : any;
  @Output() removeEvent: EventEmitter<any> = new EventEmitter();

  remove() {
    this.removeEvent.emit();
  }
}
