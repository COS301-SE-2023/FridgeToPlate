import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'fridge-to-plate-dropdown-select',
  templateUrl: './dropdown-select.component.html',
  styleUrls: ['./dropdown-select.component.css'],
})
export class DropdownSelectComponent {
  @Input() selectOptions: string[];
  @Input() selectedOptions: string[];
  @Input() placeholderText: string;
  @Output() selectedOption: EventEmitter<string> = new EventEmitter();

  public onSelect(option: string) {
    this.selectedOption.emit(option);
  }
}
