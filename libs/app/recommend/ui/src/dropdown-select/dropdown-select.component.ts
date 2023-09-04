import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'fridge-to-plate-dropdown-select',
  templateUrl: './dropdown-select.component.html',
  styleUrls: ['./dropdown-select.component.css'],
})
export class DropdownSelectComponent {
  @Input() selectOptions: string[];
  @Input() placeholderText: string;
  @Output() selectedOption: EventEmitter<string> = new EventEmitter();

  selectedOptions: string[] = ['African', 'British'];

  public onSelect(option: string) {
    if (this.selectedOptions.includes(option)) {
      this.selectedOptions = this.selectedOptions.filter(
        (currentOption) => currentOption !== option
      );
    } else {
      this.selectedOptions.push(option);
    }

    this.selectedOption.emit(option);
  }
}
