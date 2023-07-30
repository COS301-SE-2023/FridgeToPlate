import { TestBed } from '@angular/core/testing';
import { ExplorePage } from './explore.page';
import { ExploreState } from '@fridge-to-plate/app/explore/data-access';
import { CategorySearch, IExplore } from '@fridge-to-plate/app/explore/utils';
import { Select, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { IRecipe } from '@fridge-to-plate/app/recipe/utils';

// Mock the dependencies
const mockStore = {
  dispatch: jest.fn(),
};
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
      { name: 'Salt', amount: 1/4, unit: 'tsp' },
    ],
    steps: ['Whisk the eggs and milk in a bowl', 'Add salt and mix well', 'Cook in a non-stick pan until fluffy'],
    creator: 'John Doe',
  },
  // Add more mock recipes here...
];
const mockExplore$: Observable<IExplore> = of(mockExplore);
const mockRecipes$: Observable<IRecipe[]> = of(mockRecipes);

describe('ExplorePage', () => {
  let component: ExplorePage;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExplorePage],
      providers: [
        // Provide the mock store
        { provide: Store, useValue: mockStore },
      ],
    });

    // Create an instance of the component
    component = TestBed.createComponent(ExplorePage).componentInstance;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update the subpage, loading, and showRecipes properties when calling the search method', () => {
    // Set up mock search data
    const mockSearch: IExplore = {
      type: 'breakfast',
      search: 'pancakes',
      tags: ['sweet', 'easy'],
      difficulty: 'Medium',
    };

    // Set the component properties to initial values
    component.subpage = 'beforeSearchApplied';
    component.loading = false;
    component.showRecipes = false;

    // Call the search method with the mock search data
    component.search(mockSearch);

    // Check if the subpage, loading, and showRecipes properties are updated as expected
    expect(component.subpage).toBe('searchAppliedByCaterogry');
    expect(component.loading).toBe(true);
    expect(component.showRecipes).toBe(false);

    // Check if the store.dispatch method was called with the CategorySearch action
    expect(mockStore.dispatch).toHaveBeenCalledWith(new CategorySearch(mockSearch));
  });

  it('should update the showCategories and showRecipes properties when calling the explorer method', () => {
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
    expect(mockStore.dispatch).toHaveBeenCalledWith(new CategorySearch(component.searchObject));
  });

  it('should clear the subpage, showCategories, showRecipes, and loading properties when calling the clearSearch method', () => {
    // Set the component properties to initial values
    component.subpage = 'searchAppliedByCaterogry';
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
