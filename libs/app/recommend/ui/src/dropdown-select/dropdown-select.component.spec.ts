import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownSelectComponent } from './dropdown-select.component';
import { RecommendUIModule } from '../recommend.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DropdownSelectComponent', () => {
  let component: DropdownSelectComponent;
  let fixture: ComponentFixture<DropdownSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommendUIModule, HttpClientTestingModule],
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
    // Subscribe to newSearchEvent EventEmitter
    component.newSearchEvent.subscribe((searchTerm) => {
      // Assert emitted search term
      expect(searchTerm).toBe(searchQuery);
      expect(component.newSearchEvent.emit).toHaveBeenCalledWith(searchTerm);
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
});
