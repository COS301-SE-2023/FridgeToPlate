import { Component } from '@angular/core';

@Component({
  selector: 'review',
  templateUrl: './review.html',
  styleUrls: ['./review.scss'],
})
export class Review {
  rating = 0;
  description = '';

  setRating(num: number) {
    this.rating = num;
  }

  submitReview() {
    if (this.rating === 0) {
      alert('Please rate the recipe before submitting your review!');
      return;
    }

    const review = {
      rating: this.rating,
      description: this.description
    };

    // send the review data to a server or store it locally
    console.log(review);
  }
}
