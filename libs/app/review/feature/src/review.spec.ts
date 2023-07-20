import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { Review } from './review.component';
import { IReview } from '../../utils/src/interfaces';
import { ShowError } from '@fridge-to-plate/app/error/utils';
import { AddReview, DeleteReview } from '@fridge-to-plate/app/recipe/utils';

describe('Review Component', () => {
  let component: Review;
  let fixture: ComponentFixture<Review>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Review],
      imports: [NgxsModule.forRoot()],
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
      // Tests that a review can be submitted with a valid rating and description
describe('Review Component', () => {
  let component: Review;
  let fixture: ComponentFixture<Review>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Review],
      imports: [NgxsModule.forRoot()],
      providers: [
        {
          provide: Store,
          useValue: {
            dispatch: jest.fn()
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Review);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should submit a review with a valid rating and description', () => {
    // Arrange
    const review = {
      reviewId: 'uyassuigasiugfasou56tug',
      recipeId: '65vgbfg-6gdfbg-75789yh-t754vu',
      username:'jdoe',
      rating: 5,
      description: 'This recipe is amazing!'
    };
    const store = TestBed.inject(Store);
    const dispatchMock = jest.spyOn(store, 'dispatch');

    // Act
    component.rating = 5;
    component.description = 'This recipe is amazing!';
    component.submitReview();

    // Assert
    expect(dispatchMock).toHaveBeenCalledWith(new AddReview(review));
    expect(component.rating).toEqual(0);
    expect(component.description).toEqual('');
    // expect(component.errorMessage).toEqual('');
  });

});

describe('Review Component', () => {
  let component: Review;
  let fixture: ComponentFixture<Review>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Review],
      imports: [NgxsModule.forRoot()],
      providers: [
        {
          provide: Store,
          useValue: {
            dispatch: jest.fn()
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Review);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should dispatch a DeleteReview action when deleteReview is called', () => {
    // Arrange
    const reviewId = 'uyassuigasiugfasou56tug';
    const store = TestBed.inject(Store);
    const dispatchMock = jest.spyOn(store, 'dispatch');

    // Act
    component.deleteReview();

    // Assert
    expect(dispatchMock).toHaveBeenCalledWith(new DeleteReview(reviewId));
  });
});
