import { Component, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { IReview } from '../../utils/src/interfaces';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AddReview, DeleteReview } from 'libs/app/recipe/data-access/src/recipe.actions';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ShowError } from '@fridge-to-plate/app/error/utils';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ProfileState } from '@fridge-to-plate/app/profile/data-access';
import { Observable } from 'rxjs';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { IProfile } from '@fridge-to-plate/app/profile/utils';

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
  // @Select(ProfileState.getProfile) profile$!: Observable<IProfile>;

  setRating(num: number) {
    this.rating = num;
  }

  submitReview() {
    if (!this.rating || this.rating === 0) {
      this.store.dispatch(new ShowError('Please rate the recipe before submitting your review!'));
      return;
    }

    if (!this.description || this.description === '') {
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
