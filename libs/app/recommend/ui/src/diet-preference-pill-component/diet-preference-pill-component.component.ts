import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'fridge-to-plate-diet-preference-pill-component',
  templateUrl: './diet-preference-pill-component.component.html',
  styleUrls: ['./diet-preference-pill-component.component.css'],
})
export class DietPreferencePillComponentComponent implements OnInit {
  @Input() diet: string | undefined;

  @Output() click = new EventEmitter<string>();

  isPillSelected = true;

  constructor() {}

  onPillClick(event: Event) {
    this.isPillSelected = !this.isPillSelected;
    this.click.emit(this.diet);
  }

  ngOnInit() {}
}
