import { TestBed } from '@angular/core/testing';
import { ExplorePage } from './explore.page';
import { Select, Store } from '@ngxs/store';
import { ExploreState } from "@fridge-to-plate/app/explore/data-access";
import { CategorySearch, IExplore } from '@fridge-to-plate/app/explore/utils';
import { Observable, of } from "rxjs";
import { NavigationBar } from "@fridge-to-plate/app/navigation/feature";
import { Navigate } from "@ngxs/router-plugin";

// Mock the dependencies
const mockStore = {
  dispatch: jest.fn(),
};
const mockExplore: IExplore = {
  type: "breakfast",
  search: "eggs",
  tags: ["healthy", "quick"],
  difficulty: "Easy",
};
const mockRecipes: IExplore[] = [
  {
    type: "breakfast",
    search: "eggs",
    tags: ["healthy", "quick"],
    difficulty: "Easy",
  },
  {
    type: "lunch",
    search: "salad",
    tags: ["vegetarian"],
    difficulty: "Any",
  },
];
const mockExplore$: Observable<IExplore> = of(mockExplore);
const mockRecipes$: Observable<IExplore[]> = of(mockRecipes);

// Mock the @Select decorator
jest.mock('@ngxs/store', () => ({
  Select: (selector: any) => (target: any, key: string) => {
    target[key] = key === 'explore$' ? mockExplore$ : mockRecipes$;
  },
  Store: class {
    dispatch = mockStore.dispatch;
  },
}));

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

  it('should dispatch a CategorySearch action when calling the search method', () => {
    // Set up mock search data
    const mockSearch: IExplore = {
      type: "dinner",
      search: "pasta",
      tags: ["italian"],
      difficulty: "Medium",
    };

    // Call the search method with the mock search data
    component.search(mockSearch);

    // Check if the store.dispatch method was called with the CategorySearch action
    expect(mockStore.dispatch).toHaveBeenCalledWith(new CategorySearch(mockSearch));
  });

  // Add more tests as needed for the component's behavior
});
