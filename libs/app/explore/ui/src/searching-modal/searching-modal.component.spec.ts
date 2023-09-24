// Import the required dependencies for testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { SearchingModalComponent } from './searching-modal.component';
import { FormsModule } from '@angular/forms';

describe('SearchingModalComponent', () => {
  let component: SearchingModalComponent;
  let fixture: ComponentFixture<SearchingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchingModalComponent],
      imports: [NgxsModule.forRoot(), FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the SearchingModalComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should emit newSearchEvent on explorer() call', () => {
    const searchQuery = 'Test search query';
    component.searchText = searchQuery;

    // Call the explorer() method
    component.explorer();
    // Subscribe to newSearchEvent EventEmitter
    component.newSearchEvent.subscribe((searchTerm) => {
      // Assert emitted search term
      expect(searchTerm).toBe(searchQuery);
    });
  });

  it('should render the search input field', () => {
    const inputElement = fixture.debugElement.query(By.css('input'));
    expect(inputElement).toBeTruthy();
  });

  it('should emit toggleOverlay Event', () => {
    jest.spyOn(component.toggleSearchOverlayEvent, 'emit');

    component.showSearchOverlay();

    expect(component.toggleSearchOverlayEvent.emit).toHaveBeenCalled();
  });
  it('should emit searchTerm on keyUp', async () => {
    const searchTextTest = 'Test Search';

    const button = fixture.debugElement.query(By.css('input'));

    const mockEvent = new KeyboardEvent('keyup', { key: 'Enter' });

    component.searchText = searchTextTest;

    button.nativeElement.dispatchEvent(mockEvent);

    const callSpy = jest.spyOn(component, 'explorer');

    await new Promise((r) => setTimeout(r, 5000));

    component.explore$.subscribe(() => {
      expect(callSpy).toBeCalled();
    });
  }, 10000);

  it('should emit searchTerm on viewInit', async () => {
    const searchTextTest = 'Test Search';

    const button = fixture.debugElement.query(By.css('input'));

    const mockEvent = new KeyboardEvent('keyup', { key: 'Enter' });

    component.searchText = searchTextTest;

    button.nativeElement.dispatchEvent(mockEvent);

    const callSpy = jest.spyOn(component, 'ngAfterViewInit');

    await new Promise((r) => setTimeout(r, 5000));

    component.explore$.subscribe(() => {
      expect(callSpy).toBeCalled();
    });
  }, 10000);

  it('should not emit searchTerm on viewInit', async () => {
    const searchTextTest = 'Test Search';

    const button = fixture.debugElement.query(By.css('input'));

    component.searchText = searchTextTest;

    const mockEvent = new KeyboardEvent('keyup', { key: 'ArrowDown' });

    component.ngAfterViewInit();
    component.explorer();
    button.nativeElement.dispatchEvent(mockEvent);

    const callSpy = jest.spyOn(component.newSearchEvent, 'emit');

    await new Promise((r) => setTimeout(r, 5000));

    component.explore$.subscribe(() => {
      expect(callSpy).not.toBeCalled();
    });
  }, 10000);

  it('should only emit searchTerm enter key event', async () => {
    const searchTextTest = 'Test Search';

    const button = fixture.debugElement.query(By.css('input'));

    component.searchText = searchTextTest;

    const mockEvent = new KeyboardEvent('keyup', { key: 'ArrowDown' });
    const mockEvent2 = new KeyboardEvent('keyup', { key: 'ArrowUp' });
    const mockEvent3 = new KeyboardEvent('keyup', { key: 'Enter' });

    component.ngAfterViewInit();
    component.explorer();
    button.nativeElement.dispatchEvent(mockEvent);

    component.ngAfterViewInit();
    component.explorer();
    button.nativeElement.dispatchEvent(mockEvent2);

    component.ngAfterViewInit();
    component.explorer();
    button.nativeElement.dispatchEvent(mockEvent3);

    const callSpy = jest.spyOn(component.newSearchEvent, 'emit');

    await new Promise((r) => setTimeout(r, 5000));

    component.explore$.subscribe(() => {
      expect(callSpy).not.toBeCalledTimes(1);
      expect(callSpy).toHaveBeenNthCalledWith(1, searchTextTest);
    });
  }, 10000);

  it('should emit search text on searchIcon click', () => {
    const testTerm = 'searchTest';

    component.searchText = testTerm;

    const emitSearchSpy = jest.spyOn(component.newSearchEvent, 'emit');

    component.searchClick();

    expect(emitSearchSpy).toBeCalledWith(testTerm);
  });

  it('should not emit search text on searchIcon click', () => {
    const emitSearchSpy = jest.spyOn(component.newSearchEvent, 'emit');

    component.searchClick();

    expect(emitSearchSpy).not.toBeCalled();
  });
});
