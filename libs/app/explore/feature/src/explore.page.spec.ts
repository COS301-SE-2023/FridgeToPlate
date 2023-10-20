/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, NgxsModule, State } from '@ngxs/store';
import { of } from 'rxjs';
import { ExplorePage } from './explore.page';
import { CategorySearch, IExplore } from '@fridge-to-plate/app/explore/utils';
import { IRecipe } from '@fridge-to-plate/app/recipe/utils';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ExploreUIModule } from '@fridge-to-plate/app/explore/ui';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { RecipeUIModule } from '@fridge-to-plate/app/recipe/ui';

// Create a mock of the Ngxs selector
class MockExploreState {
  static getExplore = jest.fn(() => of({} as IExplore));
  static getRecipes = jest.fn(() => of([]));
}

describe('ExplorePage', () => {
  let component: ExplorePage;
  let fixture: ComponentFixture<ExplorePage>;
  let store: Store;

  const mockExplore: IExplore = {
    type: 'breakfast',
    search: 'eggs',
    tags: ['healthy', 'quick'],
    difficulty: 'Easy',
  };

  const mockRecipes: IRecipe[] = [
    {
      recipeId: '1',
      name: 'Scrambled Eggs',
      tags: ['breakfast', 'easy', 'healthy'],
      difficulty: 'Easy',
      recipeImage: 'scrambled-eggs.jpg',
      description: 'Delicious scrambled eggs recipe',
      servings: 2,
      prepTime: 10,
      meal: 'Breakfast',
      ingredients: [
        { name: 'Eggs', amount: 4, unit: 'No.' },
        { name: 'Milk', amount: 2, unit: 'tbsp' },
        { name: 'Salt', amount: 1 / 4, unit: 'tsp' },
      ],
      steps: [
        'Whisk the eggs and milk in a bowl',
        'Add salt and mix well',
        'Cook in a non-stick pan until fluffy',
      ],
      creator: 'John Doe',
      rating: 2,
    },
  ];

  @State({
    name: 'explore',
    defaults: {
      explore: mockExplore,
      recipes: mockRecipes,
    },
  })
  @Injectable()
  class MockExploreState {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([MockExploreState]),
        ExploreUIModule,
        RecipeUIModule,
        FormsModule,
        HttpClientModule,
      ],
      declarations: [ExplorePage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplorePage);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    jest.spyOn(store, 'dispatch'); // Spy on store.dispatch to check if it's called
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display recipes when search is applied by category', () => {
    component.search(mockExplore);

    expect(store.dispatch).toHaveBeenCalledWith(
      new CategorySearch(mockExplore)
    );
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.retunedRecipes).toEqual(mockRecipes);
      expect(component.showRecipes).toBe(true);
    });
  });

  it('should display recipes when explorer search is applied', () => {
    component.explorer('searchText');

    expect(store.dispatch).toHaveBeenCalledWith(
      new CategorySearch(component.searchObject)
    );
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.retunedRecipes).toEqual(mockRecipes);
      expect(component.showRecipes).toBe(true);
    });
  });

  it('should show categories when explorer search text is empty', () => {
    component.explorer('');

    expect(component.showRecipes).toBe(false);
    expect(component.showCategories).toBe(true);
  });

  it('should clear the search', () => {
    component.clearSearch();

    expect(component.subpage).toBe('beforeSearchApplied');
    expect(component.showCategories).toBe(true);
    expect(component.showRecipes).toBe(false);
  });

  it('should call search function with correct search object when valid search text is provided', () => {
    // Arrange
    const explorePage = new ExplorePage(store);
    const searchObject: IExplore = {
      type: '',
      search: 'valid search text',
      tags: [],
      difficulty: '',
    };
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    // Act
    explorePage.search(searchObject);

    // Assert
    expect(dispatchSpy).toHaveBeenCalledWith(new CategorySearch(searchObject));
  });

  it('should call searchFromHistory function with correct search term when valid search term is provided', () => {
    // Arrange
    const explorePage = new ExplorePage(store);
    const searchTerm = 'valid search term';
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    // Act
    explorePage.searchFromHistory(searchTerm);

    // Assert
    expect(dispatchSpy).toHaveBeenCalledWith(
      new CategorySearch({
        type: '',
        search: searchTerm,
        tags: [],
        difficulty: '',
      })
    );
  });

  it('should not call searchFromHistory function when empty search term is provided', () => {
    // Arrange
    const explorePage = new ExplorePage(store);
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    // Act
    explorePage.searchFromHistory('');

    // Assert
    expect(dispatchSpy).not.toHaveBeenCalled();
  });

  it('should remove filter from selected filters if it already exists', () => {
    // Arrange
    const explorePage = new ExplorePage(store);
    explorePage.selectedFilters = ['filter1', 'filter2'];

    // Act
    explorePage.addToFilters('filter2');

    // Assert
    expect(explorePage.selectedFilters).toEqual(['filter1']);
  });

  it('should add filter to selected filters if it does not already exist', () => {
    // Arrange
    const explorePage = new ExplorePage(store);
    explorePage.selectedFilters = ['filter1', 'filter2'];

    // Act
    explorePage.addToFilters('filter3');

    // Assert
    expect(explorePage.selectedFilters).toEqual([
      'filter1',
      'filter2',
      'filter3',
    ]);
  });

  it('should not add filter to selected filters if it has three already', () => {
    // Arrange
    const explorePage = new ExplorePage(store);
    explorePage.selectedFilters = ['filter1', 'filter2', 'filter3'];

    // Act
    explorePage.addToFilters('filter4');

    // Assert
    expect(explorePage.selectedFilters).toEqual([
      'filter1',
      'filter2',
      'filter3',
    ]);
  });

  it('should call applyFilters correctly', () => {
    // Arrange
    const explorePage = new ExplorePage(store);
    explorePage.selectedFilters = ['filter1', 'filter2', 'filter3'];
    explorePage.searchTerm = 'term';
    const callSpy = jest.spyOn(explorePage, 'searchFromHistory');
    const hideSpy = jest.spyOn(explorePage, 'searchFromHistory');

    // Act
    explorePage.applyFilters();

    // Assert
    expect(callSpy).toHaveBeenCalled();
    expect(hideSpy).toHaveBeenCalled();
  });

  it('should call applyFilters correctly', () => {
    // Arrange
    const explorePage = new ExplorePage(store);
    explorePage.selectedFilters = ['filter1', 'filter2', 'filter3'];

    // Act
    explorePage.clearFilters();

    // Assert
    expect(explorePage.selectedFilters).toStrictEqual([]);
  });

  it('should set isSearchOverlayVisible to true', () => {
    expect(component.isSearchOverlayVisible).toBe(false);
    component.showSearchOverlay();
    expect(component.isSearchOverlayVisible).toBe(true);
  });

  it('should not set isSearchOverlayVisible to true', () => {
    component.isSearchOverlayVisible = true;
    component.showSearchOverlay();
    expect(component.isSearchOverlayVisible).toBe(true);
  });
  it('should set isSearchOverlayVisible to false', () => {
    component.isSearchOverlayVisible = true;
    component.isDirectiveActive = true;
    component.hideSearchOverlay();
    expect(component.isSearchOverlayVisible).toBe(false);
  });

  it('should not set isSearchOverlayVisible to false', () => {
    component.isSearchOverlayVisible = true;
    component.isDirectiveActive = false;
    component.showSearchOverlay();
    expect(component.isSearchOverlayVisible).toBe(true);
  });

  it('should set showAllFilters to true', () => {
    expect(component.isDirectiveActive).toBe(true);
    component.showSearchFilters();
    expect(component.isDirectiveActive).toBe(false);
    expect(component.showAllFilters).toBe(true);
  });

  it('should not set isSearchOverlayVisible to true', () => {
    component.showAllFilters = true;
    expect(component.isDirectiveActive).toBe(true);
    component.showSearchFilters();
    expect(component.isDirectiveActive).toBe(false);
  });

  it('should set showAllFilters to false', () => {
    component.showAllFilters = true;
    component.hideSearchFilters();
    expect(component.showAllFilters).toBe(false);
  });

  it('should not set isSearchOverlayVisible to false', () => {
    component.hideSearchFilters();
    expect(component.showAllFilters).toBe(false);
  });
});
