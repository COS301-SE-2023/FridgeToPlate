import { Component } from '@angular/core';

@Component({
  selector: 'review',
  templateUrl: './review.html',
  styleUrls: ['./review.scss'],
})
export class Review {
  rating = 0;
  description = '';
  showReviews = false;

  reviews = [
    { rating: 4, description: 'Good stuff'},
    { rating: 3, description: 'Nice'},
    { rating: 5, description: 'Perfect'},
    { rating: 1, description: 'Mediocre'},
  ]


  setRating(num: number) {
    this.rating = num;
  }

  toggleReviews() {
    this.showReviews = !this.showReviews;
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


    const review = {
      rating: this.rating,
      description: this.description
    };

    this.reviews.unshift(review);

    // send the review data to a server or store it locally
    console.log(this.reviews);
  }
}
