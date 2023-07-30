/* eslint-disable prefer-const */
import { TestBed } from '@angular/core/testing';
import { ExplorePage } from './explore.page';
import { ExploreState } from '@fridge-to-plate/app/explore/data-access';
import { CategorySearch, IExplore } from '@fridge-to-plate/app/explore/utils';
import { Select, Store, NgxsModule, State } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { IRecipe } from '@fridge-to-plate/app/recipe/utils';
import { Injectable } from '@angular/core';

describe('ExplorePage', () => {
  let component: ExplorePage;
  let mockStore: Store;
  let mockExplore: IExplore;
  let mockRecipes: IRecipe[];

  // Set up mock search data
  mockExplore = {
    type: 'breakfast',
    search: 'eggs',
    tags: ['healthy', 'quick'],
    difficulty: 'Easy',
  };
  // Set up mock recipes
  mockRecipes = [
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

  @State({
    name: 'explore',
    defaults: {
      explore: mockExplore,
      recipes: mockRecipes,
    },
  })
  @Injectable()
  class MockExploreState {}

  beforeEach(() => {
    
    mockStore = {
      dispatch: jest.fn(),
    } as unknown as Store;

    TestBed.configureTestingModule({
      declarations: [ExplorePage],
      providers: [
        { provide: Store, useValue: mockStore },
      ],
      imports: [NgxsModule.forRoot([MockExploreState])],
    });

    mockStore = TestBed.inject(Store);

    // Create an instance of the component
    component = TestBed.createComponent(ExplorePage).componentInstance;

  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update the subpage, loading, and showRecipes properties when calling the search method', () => {
    // Spy on the store dispatch method
    const dispatchSpy = jest.spyOn(mockStore, 'dispatch');

    // Set the component properties to initial values
    component.subpage = 'beforeSearchApplied';
    component.loading = false;
    component.showRecipes = false;

    // Call the search method with the mock search data
    component.search(mockExplore);

    // Check if the subpage, loading, and showRecipes properties are updated as expected
    expect(component.subpage).toBe('searchAppliedByCategory');
    expect(component.loading).toBe(true);
    expect(component.showRecipes).toBe(false);

    // Check if the store.dispatch method was called with the CategorySearch action
    expect(dispatchSpy).toHaveBeenCalledWith(new CategorySearch(mockExplore));
  });

  it('should update the showCategories and showRecipes properties when calling the explorer method', () => {
    // Spy on the store dispatch method
    const dispatchSpy = jest.spyOn(mockStore, 'dispatch');

    // Set up mock search text
    const mockSearchText = 'pasta';

    // Set the component properties to initial values
    component.showCategories = true;
    component.showRecipes = false;

    // Call the explorer method with the mock search text
    component.explorer(mockSearchText);

    // Check if the showCategories and showRecipes properties are updated as expected
    expect(component.showCategories).toBe(false);
    expect(component.showRecipes).toBe(true);

    // Check if the store.dispatch method was called with the CategorySearch action and the updated explore object
    expect(dispatchSpy).toHaveBeenCalledWith(new CategorySearch(mockExplore));
  });

  it('should clear the subpage, showCategories, showRecipes, and loading properties when calling the clearSearch method', () => {
    // Set the component properties to initial values
    component.subpage = 'searchAppliedByCategory';
    component.showCategories = false;
    component.showRecipes = true;
    component.loading = true;

    // Call the clearSearch method
    component.clearSearch();

    // Check if the subpage, showCategories, showRecipes, and loading properties are cleared
    expect(component.subpage).toBe('beforeSearchApplied');
    expect(component.showCategories).toBe(true);
    expect(component.showRecipes).toBe(false);
    expect(component.loading).toBe(false);
  });
});
