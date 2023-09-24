import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { Review } from './review.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { IReview } from '../../utils/src/interfaces';
import { ShowError } from '@fridge-to-plate/app/error/utils';
import { AddReview, DeleteReview } from '@fridge-to-plate/app/recipe/utils';
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

  // it('should dispatch a DeleteReview action to the store with the correct review ID', () => {
  //   const reviewId = '12345';
  //   const selectedReview = { reviewId: reviewId } as IReview;
  //   const dispatchSpy = jest.spyOn(store, 'dispatch');
  //   const findSpy = jest.spyOn(Array.prototype, 'find').mockReturnValueOnce(selectedReview);

  //   component.deleteReview(reviewId);

  //   expect(findSpy).toHaveBeenCalledWith(expect.any(Function));
  //   expect(dispatchSpy).toHaveBeenCalledWith(new DeleteReview(reviewId));
  // });

  it('should dispatch a DeleteReview action to the store with the correct review ID from state if no review ID is provided', () => {
    const reviewId = '12345';
    const selectedReview = { reviewId: reviewId } as IReview;
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const findSpy = jest
      .spyOn(Array.prototype, 'find')
      .mockReturnValueOnce(selectedReview);
    const getStateSpy = jest
      .spyOn(store, 'select')
      .mockReturnValueOnce(of({ reviews: [selectedReview] }));

    component.deleteReview();

    expect(getStateSpy).toHaveBeenCalled();
    expect(findSpy).toHaveBeenCalledWith(expect.any(Function));
    expect(dispatchSpy).toHaveBeenCalledWith(new DeleteReview(reviewId));
  });
});
