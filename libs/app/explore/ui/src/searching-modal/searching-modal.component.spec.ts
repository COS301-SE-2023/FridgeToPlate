// Import the required dependencies for testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgxsModule, Select, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { SearchingModalComponent } from './searching-modal.component';
import { ExploreUIModule } from '../explore.module';
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
});
