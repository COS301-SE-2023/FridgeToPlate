import { Component } from '@angular/core';
import { Store } from '@ngxs/store';

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

  reviews = [
    { recipeId: 'abcd' , rating: 4, description: 'Good stuff'},
    { recipeId: 'abcd' , rating: 3, description: 'Nice'},
    { recipeId: 'abcn' , rating: 5, description: 'Perfect'},
    { recipeId: 'abcw' , rating: 1, description: 'Mediocre'},
  ]


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

    this.store.dispatch(new AddReview());

    // const review = {
    //   rating: this.rating,
    //   description: this.description
    // };

    // this.reviews.unshift(review);

    // // send the review data to a server or store it locally
    // console.log(this.reviews);
  }
}
