// Import the required dependencies for testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { SearchingModalComponent } from './searching-modal.component';

// Create a mock ExploreState to be used in the tests
const mockExploreState = {
  getExplore: jest.fn().mockReturnValue(of({})), // Return an empty object for simplicity
};

// Create a mock Store
class MockStore {
  select() {
    return of({}); // Return an empty object for simplicity
  }
}

describe('SearchingModalComponent', () => {
  let component: SearchingModalComponent;
  let fixture: ComponentFixture<SearchingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchingModalComponent],
      providers: [
        { provide: Store, useClass: MockStore },
        { provide: Select, useValue: mockExploreState },
      ],
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

    // Create a spy on the newSearchEvent EventEmitter
    const emitSpy = jest.spyOn(component.newSearchEvent, 'emit');

    // Call the explorer() method
    component.explorer();

    // Check if the emit method was called with the correct argument
    expect(emitSpy).toHaveBeenCalledWith(searchQuery);
  });

  it('should render the search input field', () => {
    const inputElement = fixture.debugElement.query(By.css('input'));
    expect(inputElement).toBeTruthy();
  });

});

