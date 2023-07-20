import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { Review } from './review.component';

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
