import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { IReview } from '../../utils/src/interfaces';
import { AddReview } from 'libs/app/recipe/data-access/src/recipe.actions';

@Component({
  selector: 'review',
  templateUrl: './review.html',
  styleUrls: ['./review.scss'],
})
export class Review {
  rating = 0;
  description = '';
  showReviews = false;

  constructor (private store: Store) {}

  @Input() reviews!: IReview[];
  //null check for if recipe has no reviews

  // reviews = [
  //   { recipeId: 'abcd' , rating: 4, description: 'Good stuff'},
  //   { recipeId: 'abcd' , rating: 3, description: 'Nice'},
  //   { recipeId: 'abcn' , rating: 5, description: 'Perfect'},
  //   { recipeId: 'abcw' , rating: 1, description: 'Mediocre'},
  // ]


  setRating(num: number) {
    this.rating = num;
  }

  submitReview() {
    if (this.rating === 0) {
      alert('Please rate the recipe before submitting your review!');
      return;
    }

    if (this.description === '') {
      alert('Please add a description before submitting your review!');
      return;
    }

    const review: IReview = {
      reviewId: 'uyassuigasiugfasou56tug',
      recipeId: '65vgbfg-6gdfbg-75789yh-t754vu',
      username:'jdoe',
      rating: this.rating,
      description: this.description
    };

    this.store.dispatch(new AddReview(review));

    //RemoveReview(reviewId)

    // this.reviews.unshift(review);

    // // send the review data to a server or store it locally
    // console.log(this.reviews);
  }
}
