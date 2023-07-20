import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { IReview } from '../../utils/src/interfaces';
import { AddReview, DeleteReview } from 'libs/app/recipe/data-access/src/recipe.actions';
import { ShowError } from '@fridge-to-plate/app/error/utils';

@Component({
  selector: 'review',
  templateUrl: './review.html',
  styleUrls: ['./review.scss'],
})
export class Review {
  rating = 0;
  description = '';

  constructor (private store: Store) {}

  @Input() reviews!: IReview[];

  setRating(num: number) {
    this.rating = num;
  }

  submitReview() {
    if (this.rating === 0) {
      this.store.dispatch(new ShowError('Please rate the recipe before submitting your review!'));
      return;
    }

    if (this.description === '') {
      this.store.dispatch(new ShowError('Please add a description before submitting your review!'));
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

    this.rating = 0;
    this.description = '';

  }

  deleteReview() {

    const reviewId = 'uyassuigasiugfasou56tug';
    this.store.dispatch(new DeleteReview(reviewId));
  }

}
