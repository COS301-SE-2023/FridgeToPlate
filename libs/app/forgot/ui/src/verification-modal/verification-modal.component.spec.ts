import { TestBed } from '@angular/core/testing';
import { VerificationModalComponent } from './verification-modal.component';
import { Store } from '@ngxs/store';
import { NewPassword } from '@fridge-to-plate/app/auth/utils';
import { ShowError } from '@fridge-to-plate/app/error/utils';

// Mock the dependencies
const mockStore = {
  dispatch: jest.fn(),
};

describe('VerificationModalComponent', () => {
  let component: VerificationModalComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerificationModalComponent],
      providers: [
        // Provide the mock store
        { provide: Store, useValue: mockStore },
      ],
    });

    // Create an instance of the component
    component = TestBed.createComponent(VerificationModalComponent).componentInstance;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch a NewPassword action when all required fields are filled and passwords match', () => {
    // Set up component properties
    component.verification_code = '123456'; // Replace with your test verification code
    component.new_password = 'new_password'; // Replace with your test new password
    component.confirm_password = 'new_password'; // Make sure passwords match for this test

    // Call the onVerify function
    component.onVerify();

    // Check if the store.dispatch method was called with the NewPassword action
    expect(mockStore.dispatch).toHaveBeenCalledWith(new NewPassword('123456', 'new_password'));
  });

  it('should not dispatch any action when any required field is empty', () => {
    // Call the onVerify function without setting any properties

    // Call the onVerify function
    component.onVerify();

    // Check if the store.dispatch method was not called
    expect(mockStore.dispatch).not.toHaveBeenCalled();
  });

  it('should dispatch a ShowError action when passwords do not match', () => {
    // Set up component properties
    component.verification_code = '123456'; // Replace with your test verification code
    component.new_password = 'password1'; // Replace with your test new password
    component.confirm_password = 'password2'; // Make sure passwords do not match for this test

    // Call the onVerify function
    component.onVerify();

    // Check if the store.dispatch method was called with the ShowError action
    expect(mockStore.dispatch).toHaveBeenCalledWith(new ShowError('Please Enter Matching Passwords'));
  });

  // Add more tests as needed for the component's behavior
});
