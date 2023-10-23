import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { Review } from './review.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { IReview } from '@fridge-to-plate/app/review/utils';
import { ShowError } from '@fridge-to-plate/app/error/utils';
import { DeleteReview } from '@fridge-to-plate/app/recipe/utils';
import { of } from 'rxjs';

describe('Review Component', () => {
  let component: Review;
  let fixture: ComponentFixture<Review>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot(), IonicModule, FormsModule],
      declarations: [Review],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Review);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set the rating', () => {
    const rating = 4;
    component.setRating(rating);
    expect(component.rating).toEqual(rating);
  });
});

describe('Review Component', () => {
  let component: Review;
  let fixture: ComponentFixture<Review>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Review],
      imports: [NgxsModule.forRoot(), IonicModule, FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Review);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should dispatch an error message if the rating is not provided', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    component.submitReview();
    expect(dispatchSpy).toHaveBeenCalledWith(
      new ShowError('Please rate the recipe before submitting your review!')
    );
  });

  it('should dispatch an error message if the description is not provided', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    component.setRating(3);
    component.submitReview();
    expect(dispatchSpy).toHaveBeenCalledWith(
      new ShowError('Please add a description before submitting your review!')
    );
  });

  it('should dispatch an error message if the description length is more than 100 characters', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    component.setRating(3);
    component.description = "I like pie.I like pie.I like pie.I like pie.I like pie.I like pie.I like pie.I like pie.I like pie.I like pie.I like pie.I like pie.I like pie.I like pie.I like pie.I like pie.I like pie.";
    component.submitReview();
    expect(dispatchSpy).toHaveBeenCalledWith(
      new ShowError('Description must not be more than 100 characters')
    );
  });

  it('should dispatch an error message if the user not loggin in', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    component.setRating(3);
    component.description = "Chilled";
    component.stateUsername = "";
    component.submitReview();
    expect(dispatchSpy).toHaveBeenCalledWith(
      new ShowError('You Must Be Logged In To Add A Review')
    );
  });

    // Sets 'showNoRecipesMessage' to true when the last review is deleted.
    it('should set showNoRecipesMessage to true when the last review is deleted', () => {
      // Arrange
      const reviewId = 'validReviewId';
      const stateRecipe = {
        reviews: [
          { reviewId: 'validReviewId' }
        ]
      };
      const storeMock = {
        dispatch: jest.fn()
      };
      const recipe$Mock = {
        subscribe: jest.fn().mockImplementation(callback => callback(stateRecipe))
      };
      // const component = new Review(storeMock);
      // component.recipe$ = recipe$Mock;

      // Act
      component.deleteReview(reviewId);

      // Assert
      expect(component.showNoRecipesMessage).toBe(true);
    });

        // Subscribes to 'profile$' observable and sets 'stateUsername' to the username of the emitted 'stateProfile'
    it('should subscribe to \'profile$\' observable and set \'stateUsername\' to the username of the emitted \'stateProfile\'', () => {
      // const stateProfile = { username: 'testUser' };
      // const profile$ = of(stateProfile);

      // const recipe$Mock = {
      //   subscribe: jest.fn().mockImplementation(callback => callback(stateProfile))
      // };

      // component.ngOnInit();

      // expect(component.stateUsername).toBe('testUser');
    });
  });
  // it('should dispatch a DeleteReview action to the store with the correct review ID', () => {
  //   const reviewId = '12345';
  //   const selectedReview = { reviewId: reviewId } as IReview;
  //   const dispatchSpy = jest.spyOn(store, 'dispatch');
  //   const findSpy = jest.spyOn(Array.prototype, 'find').mockReturnValueOnce(selectedReview);

  //   component.deleteReview(reviewId);

  //   expect(findSpy).toHaveBeenCalledWith(expect.any(Function));
  //   expect(dispatchSpy).toHaveBeenCalledWith(new DeleteReview(reviewId));
  // });

  // it('should dispatch a DeleteReview action to the store with the correct review ID from state if no review ID is provided', () => {
  //   const reviewId = '12345';
  //   const selectedReview = { reviewId: reviewId } as IReview;
  //   const dispatchSpy = jest.spyOn(store, 'dispatch');
  //   const findSpy = jest
  //     .spyOn(Array.prototype, 'find')
  //     .mockReturnValueOnce(selectedReview);
  //   const getStateSpy = jest
  //     .spyOn(store, 'select')
  //     .mockReturnValueOnce(of({ reviews: [selectedReview] }));

  //   component.deleteReview();

  //   expect(getStateSpy).toHaveBeenCalled();
  //   expect(findSpy).toHaveBeenCalledWith(expect.any(Function));
  //   expect(dispatchSpy).toHaveBeenCalledWith(new DeleteReview(reviewId));
  // });
