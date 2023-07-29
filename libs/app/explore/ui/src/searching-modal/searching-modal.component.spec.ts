import { TestBed } from '@angular/core/testing';
import { SearchingModalComponent } from './searching-modal.component';
import { ExploreState } from '@fridge-to-plate/app/explore/data-access';
import { IExplore, CategorySearch } from '@fridge-to-plate/app/explore/utils';
import { Select, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';

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
const mockExplore$: Observable<IExplore> = of(mockExplore);

// Mock the @Select decorator
jest.mock('@ngxs/store', () => ({
  Select: (selector: any) => (target: any, key: string) => {
    target[key] = key === 'explore$' ? mockExplore$ : undefined;
  },
  Store: class {
    dispatch = mockStore.dispatch;
  },
}));

describe('SearchingModalComponent', () => {
  let component: SearchingModalComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchingModalComponent],
      providers: [
        // Provide the mock store
        { provide: Store, useValue: mockStore },
      ],
    });

    // Create an instance of the component
    component = TestBed.createComponent(SearchingModalComponent).componentInstance;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update the explore search text and dispatch a CategorySearch action when calling the search method', () => {
    // Set up mock search text
    const mockSearchText = 'pasta'; // Replace with your test search text

    // Set up mock Explore object
    component.editExplore = {
        type: 'breakfast',
        search: 'eggs',
        tags: ['healthy', 'quick'],
        difficulty: 'Easy',
      };

    // Set the search text in the component
    component.searchText = mockSearchText;

    // Call the search method
    component.search();

    // Check if the search text is updated in the editExplore object
    expect(component.editExplore.search).toBe(mockSearchText);

    // Check if the store.dispatch method was called with the CategorySearch action and the updated explore object
    expect(mockStore.dispatch).toHaveBeenCalledWith(new CategorySearch(component.editExplore));
  });

  it('should emit the closeFunc event when calling the close method', () => {
    // Create a spy on the closeFunc EventEmitter
    const emitSpy = jest.spyOn(component.closeFunc, 'emit');

    // Call the close method
    component.close();

    // Check if the closeFunc event was emitted
    expect(emitSpy).toHaveBeenCalled();
  });

  // Add more tests as needed for the component's behavior
});
