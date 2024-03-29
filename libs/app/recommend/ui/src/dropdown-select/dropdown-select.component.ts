import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'fridge-to-plate-dropdown-select',
  templateUrl: './dropdown-select.component.html',
  styleUrls: ['./dropdown-select.component.css'],
})
export class DropdownSelectComponent implements AfterViewInit, OnDestroy {
  @Input() selectOptions: string[];
  @Input() selectedOptions: string[];
  @Input() placeholderText: string;
  @Output() selectedOption: EventEmitter<string> = new EventEmitter();

  isDropdownShowing = false;

  isLoading = false;

  searchText = '';

  filterEvent$: Observable<unknown>;

  destroy$: Subject<boolean> = new Subject<boolean>();

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
  }

  filterKeywordsList() {
    this.newSearchEvent.emit(this.searchText);
    this.isLoading = false;
  }

  ngAfterViewInit() {
    this.filterEvent$ = fromEvent(this.input.nativeElement, 'keyup').pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged(),
      debounceTime(1100)
    );

    this.filterEvent$.subscribe(() => {
      if (this.searchText) {
        this.filterKeywordsList();
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
