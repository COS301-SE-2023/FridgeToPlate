import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { CreatePage } from './create.page';

describe('YourComponent', () => {
  let component: CreatePage;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ component ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    const fixture = TestBed.createComponent(CreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should return true if the provided plan is selected', () => {
    // Arrange
    
    const dietaryPlansControl = component.recipeForm.get('dietaryPlans');
if (dietaryPlansControl?.setValue) {
  dietaryPlansControl.setValue(['vegetarian', 'vegan']);
}

    // Act
    const result = component.isDietaryPlanSelected('vegetarian');

    // Assert
    expect.extend({
        toBeTrue(result) {
          const pass = result === true;
          if (pass) {
            return {
              message: () => `expected ${result} to be false`,
              pass: true,
            };
          } else {
            return {
              message: () => `expected ${result} to be false`,
              pass: false,
            };
          }
        },
      });
  });

  it('should return false if the provided plan is not selected', () => {
    // Arrange
    const dietaryPlansControl = component.recipeForm.get('dietaryPlans');
    if (dietaryPlansControl?.setValue) {
      dietaryPlansControl.setValue(['vegetarian', 'vegan']);
    }

    // Act
    const result = component.isDietaryPlanSelected('paleo');

    // Assert
    expect.extend({
        toBeTrue(result) {
          const pass = result === true;
          if (pass) {
            return {
              message: () => `expected ${result} to be false`,
              pass: true,
            };
          } else {
            return {
              message: () => `expected ${result} to be false`,
              pass: false,
            };
          }
        },
      });
  });
});