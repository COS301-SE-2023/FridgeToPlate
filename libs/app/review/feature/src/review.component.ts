import { Component, Input, OnInit } from '@angular/core';
import { NgxsOnInit, Select, StateContext, Store } from '@ngxs/store';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { IReview } from '../../utils/src/interfaces';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ShowError } from '@fridge-to-plate/app/error/utils';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ProfileState } from '@fridge-to-plate/app/profile/data-access';
import { Observable } from 'rxjs';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { IProfile } from '@fridge-to-plate/app/profile/utils';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { RecipeState } from '@fridge-to-plate/app/recipe/data-access';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AddReview, DeleteReview, IRecipe } from '@fridge-to-plate/app/recipe/utils';

@Component({
  selector: 'review',
  templateUrl: './review.html',
  styleUrls: ['./review.scss'],
})
export class Review implements OnInit {
  rating = 0;
  description = '';
  stateUsername = '';

  @Input() reviews!: IReview[];
  @Select(ProfileState.getProfile) profile$!: Observable<IProfile>;
  @Select(RecipeState.getRecipe) recipe$!: Observable<IRecipe>;

  constructor (private store: Store) {}

  ngOnInit() {
    this.profile$.subscribe( (stateProfile) => {
      this.stateUsername = stateProfile.username;
    });
  }

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

    let stateRecipeId = '';
    this.recipe$.subscribe( (stateRecipe) => {
      stateRecipeId = stateRecipe.recipeId ?? '';
    });


    const review: IReview = {
      recipeId: stateRecipeId,
      username: this.stateUsername,
      rating: this.rating,
      description: this.description
    };

    this.store.dispatch(new AddReview(review));

    this.rating = 0;
    this.description = '';

  }

  deleteReview(selectedReview: string | null = null) {

    let stateReviewId = '';

    this.recipe$.subscribe( (stateRecipe) => {
      stateReviewId = stateRecipe.reviews?.find((el) => el.reviewId === selectedReview)?.reviewId ?? "";
    });

    this.store.dispatch(new DeleteReview(stateReviewId));
  }

}
