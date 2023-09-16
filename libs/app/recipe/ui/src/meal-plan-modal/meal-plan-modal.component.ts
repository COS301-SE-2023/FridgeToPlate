import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'meal-plan-modal',
  templateUrl: './meal-plan-modal.component.html',
  styleUrls: ['./meal-plan-modal.component.scss'],
})
export class MealPlanModalComponent {
  @Output() closeFunc: EventEmitter<any> = new EventEmitter();
  @Output() saveFunc: EventEmitter<any> = new EventEmitter();

  dateSelected !: string;

  constructor() {
    this.dateSelected = new Date().toISOString().slice(0, 10);
  }

  close() {
    this.closeFunc.emit();
  }

  save(meal: string) {
    this.saveFunc.emit({ meal: meal, date: this.dateSelected });
    this.closeFunc.emit();
  }
}
