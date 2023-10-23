import { Component, Input, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { IReview } from '@fridge-to-plate/app/review/utils';
import { ShowError } from '@fridge-to-plate/app/error/utils';
import { ProfileState } from '@fridge-to-plate/app/profile/data-access';
import { Observable } from 'rxjs';
import { IProfile } from '@fridge-to-plate/app/profile/utils';
import { RecipeState } from '@fridge-to-plate/app/recipe/data-access';
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
  showNoRecipesMessage:boolean ;

  @Input() reviews!: IReview[];
  @Select(ProfileState.getProfile) profile$!: Observable<IProfile>;
  @Select(RecipeState.getRecipe) recipe$!: Observable<IRecipe>;

  constructor (private store: Store) {}

  ngOnInit() {
    this.profile$.subscribe( (stateProfile) => {
      this.stateUsername = stateProfile.username;
    });
    this.recipe$.subscribe( (stateRecipe) => {

      if (stateRecipe.reviews && stateRecipe.reviews?.length > 0) {
        this.showNoRecipesMessage = false;
      }
      else {
        this.showNoRecipesMessage = true;
      }

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

    if (!this.description || this.description.trim() === '') {
      this.store.dispatch(new ShowError('Please add a description before submitting your review!'));
      return;
    }

    if (this.description.length >= 100) {
      this.store.dispatch(new ShowError('Description must not be more than 100 characters'));
      return;
    }

    if (!this.stateUsername || this.stateUsername === '') {
      this.store.dispatch(new ShowError('You Must Be Logged In To Add A Review'));
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
    this.showNoRecipesMessage = false;

  }

  deleteReview(selectedReview: string | null = null) {

    let stateReviewId = '';
    let numReviewsLeft = 0;

    this.recipe$.subscribe( (stateRecipe) => {
      stateReviewId = stateRecipe.reviews?.find((el) => el.reviewId === selectedReview)?.reviewId ?? "";

      if (stateRecipe.reviews) {
        numReviewsLeft = stateRecipe.reviews?.length - 1;
      }
    });

    this.store.dispatch(new DeleteReview(stateReviewId));

    if (numReviewsLeft <= 0) {
      this.showNoRecipesMessage = true;
    }

  }

}
