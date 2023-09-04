import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, tap } from 'rxjs';

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

  isLoading = false;

  searchText = '';

  @ViewChild('input') input: ElementRef;

  @Output() newSearchEvent = new EventEmitter<string>();

  public onSelect(option: string) {
    this.selectedOption.emit(option);
  }

  public showDropdown() {
    if (!this.isDropdownShowing) this.isDropdownShowing = true;
  }
  public hideDropdown() {
    if (this.isDropdownShowing) this.isDropdownShowing = false;
  }

  filterOptions() {
    this.isLoading = true;

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(1100),
        distinctUntilChanged(),
        tap((text) => {
          this.newSearchEvent.emit(this.searchText);
          this.isLoading = false;
        })
      )
      .subscribe();
  }
}
