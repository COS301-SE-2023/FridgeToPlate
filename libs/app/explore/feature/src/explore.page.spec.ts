/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, NgxsModule, State } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { ExplorePage } from './explore.page';
import { ExploreState, } from '@fridge-to-plate/app/explore/data-access';
import { CategorySearch, IExplore } from '@fridge-to-plate/app/explore/utils';
import { IRecipe } from '@fridge-to-plate/app/recipe/utils';
import { Injectable } from '@angular/core';


// Create a mock of the Ngxs selector
class MockExploreState {
  static getExplore = jest.fn(() => of({} as IExplore));
  static getRecipes = jest.fn(() => of([]));
}

describe('ExplorePage', () => {
  let component: ExplorePage;
  let fixture: ComponentFixture<ExplorePage>;
  let store: Store;

  let mockExplore: IExplore;
  let mockRecipes: IRecipe[];



  @State({
    name: 'explore',
    defaults: {
      explore: null,
      recipes: [],
    },
  })
  @Injectable()
  class MockExploreState {}

  beforeEach(async () => {
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
        steps: ['Whisk the eggs and milk in a bowl', 'Add salt and mix well', 'Cook in a non-stick pan until fluffy'],
        creator: 'John Doe',
      },
    ];

    await TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([MockExploreState])],
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

    expect(store.dispatch).toHaveBeenCalledWith(new CategorySearch(mockExplore));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.retunedRecipes).toEqual(mockRecipes);
      expect(component.loading).toBe(false);
      expect(component.showRecipes).toBe(true);
    });
  });

  it('should display recipes when explorer search is applied', () => {

    component.explorer('searchText');

    expect(store.dispatch).toHaveBeenCalledWith(new CategorySearch(component.searchObject));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.retunedRecipes).toEqual(mockRecipes);
      expect(component.loading).toBe(false);
      expect(component.showRecipes).toBe(true);
    });
    
  });

  it('should show categories when explorer search text is empty', () => {
    component.explorer('');

    expect(component.loading).toBe(false);
    expect(component.showRecipes).toBe(false);
    expect(component.showCategories).toBe(true);
  });

  it('should clear the search', () => {
    component.clearSearch();

    expect(component.subpage).toBe('beforeSearchApplied');
    expect(component.showCategories).toBe(true);
    expect(component.showRecipes).toBe(false);
    expect(component.loading).toBe(false);
  });
});
