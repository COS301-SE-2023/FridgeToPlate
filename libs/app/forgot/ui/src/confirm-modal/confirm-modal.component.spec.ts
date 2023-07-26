import { TestBed } from '@angular/core/testing';
import { ConfirmModalComponent } from './confirm-modal.component';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

// Mock the dependencies
const mockStore = {
  dispatch: jest.fn(),
};

describe('ConfirmModalComponent', () => {
  let component: ConfirmModalComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmModalComponent],
      providers: [
        // Provide the mock store
        { provide: Store, useValue: mockStore },
      ],
    });

    // Create an instance of the component
    component = TestBed.createComponent(ConfirmModalComponent).componentInstance;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch a Navigate action when calling goLogin', () => {
    // Call the goLogin function
    component.goLogin();

    // Check if the store.dispatch method was called with the Navigate action
    expect(mockStore.dispatch).toHaveBeenCalledWith(new Navigate(['/login']));
  });

  // Add more tests as needed for the component's behavior
});
