import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownSelectComponent } from './dropdown-select.component';
import { RecommendUIModule } from '../recommend.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('DropdownSelectComponent', () => {
  let component: DropdownSelectComponent;
  let fixture: ComponentFixture<DropdownSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommendUIModule, HttpClientTestingModule, FormsModule],
      declarations: [DropdownSelectComponent],
      // providers: [HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit newSearchEvent on explorer() call', () => {
    const searchQuery = 'Test search query';

    const instantiatedComponent = new DropdownSelectComponent();

    jest.spyOn(component.newSearchEvent, 'emit');

    instantiatedComponent.searchText = searchQuery;

    // Call the filter() method
    expect(component.isLoading).toBe(false);
    component.filterOptions();
    fixture.whenStable().then(() => {
      expect(component.newSearchEvent.emit).toHaveBeenCalledWith(searchQuery);
      expect(component.isLoading).toBe(true);
    });
  });

  it('should toggle dropDownShowing to true', () => {
    expect(component.isDropdownShowing).toBe(false);
    component.showDropdown();
    expect(component.isDropdownShowing).toBe(true);
  });

  it('should toggle dropDownShowing to false', () => {
    component.isDropdownShowing = true;
    component.hideDropdown();
    expect(component.isDropdownShowing).toBe(false);
  });

  it('should emit selectedKeyword', () => {
    const selectedKeyword = 'test';

    component.onSelect('test');

    component.selectedOption.subscribe((searchTerm) => {
      expect(searchTerm).toBe(selectedKeyword);
    });
  });

  it('should emit searchTerm on keyUp', async () => {
    const searchTextTest = 'Test Search';

    const button = fixture.debugElement.query(By.css('input'));

    const keyUpEvent = new Event('keyup');

    component.searchText = searchTextTest;

    button.nativeElement.dispatchEvent(keyUpEvent);

    const callSpy = jest.spyOn(component, 'filterKeywordsList');

    await new Promise((r) => setTimeout(r, 5000));

    component.filterEvent$.subscribe(() => {
      expect(callSpy).toBeCalled();
      expect(component.isLoading).toBe(false);
    });
  }, 10000);

  it('should set loading to false and update searchText', () => {
    const searchText = 'Test text';
    const emitEvent = jest.spyOn(component.newSearchEvent, 'emit');

    const callSpy = jest.spyOn(component, 'filterKeywordsList');
    expect(component.searchText).toBe('');
    expect(component.isLoading).toBe(false);

    component.searchText = searchText;

    component.filterOptions();

    expect(component.isLoading).toBe(true);

    component.filterKeywordsList();

    expect(component.isLoading).toBe(false);

    expect(callSpy).toBeCalled();

    expect(emitEvent).toBeCalledWith(searchText);
  });
});
