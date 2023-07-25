import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Review } from './review.component';
import {IonicModule} from "@ionic/angular";
import {FormsModule} from "@angular/forms";

describe('Review', () => {
  let component: Review;
  let fixture: ComponentFixture<Review>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule, FormsModule],
      declarations: [Review]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Review);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set the rating property', () => {
    component.setRating(3);
    expect(component.rating).toEqual(3);
  });


  it('should add a review to the front of the reviews array', () => {
    component.rating = 4;
    component.description = 'Great recipe';

    component.submitReview();

    expect(component.reviews.length).toEqual(5);
    expect(component.reviews[0].rating).toEqual(4);
    expect(component.reviews[0].description).toEqual('Great recipe');
  });
});
