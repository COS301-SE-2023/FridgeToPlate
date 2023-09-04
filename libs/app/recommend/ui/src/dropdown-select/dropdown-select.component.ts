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

  isDropdownShowing = false;

  public onSelect(option: string) {
    this.selectedOption.emit(option);
  }

  public showDropdown() {
    if (!this.isDropdownShowing) this.isDropdownShowing = true;
  }
  public hideDropdown() {
    if (this.isDropdownShowing) this.isDropdownShowing = false;
  }
}
