import { Component, Input, OnInit, NgZone  } from '@angular/core';
import { ProfileState } from '@fridge-to-plate/app/profile/data-access';
import { AddToMealPlan, IProfile, RemoveFromMealPlan, RemoveSavedRecipe, SaveRecipe } from '@fridge-to-plate/app/profile/utils';
import { IRecipeDesc, IncreaseViews } from '@fridge-to-plate/app/recipe/utils';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ShowError } from '@fridge-to-plate/app/error/utils';
import { Navigate } from '@ngxs/router-plugin';
import { LoadRecipe } from '@fridge-to-plate/app/edit-recipe/utils';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent implements OnInit {

  @Select(ProfileState.getProfile) profile$ !: Observable<IProfile | null>;

  @Input() recipe !: any;
  bookmarked = false;
  editable = true;
  @Input() added = false;
  showMenu = false;
  @Input() mealPlanType = "";

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.profile$.subscribe(profile => {
      if (profile !== null && this.recipe !== undefined) {
        this.bookmarked = profile.savedRecipes.some((object) => object.recipeId === this.recipe.recipeId);
        this.editable = profile.createdRecipes.some((object) => object.recipeId === this.recipe.recipeId);
      } else {
        this.bookmarked = false;
        this.editable = false;
        this.added = false;
      }
    });
  }

  changeSaved() {
    if (this.bookmarked) {
      this.store.dispatch(new RemoveSavedRecipe(this.recipe as IRecipeDesc));
    } else {
      this.store.dispatch(new SaveRecipe(this.recipe as IRecipeDesc));
    }

    this.bookmarked = !this.bookmarked;
  }

  edit() {
      if(!this.recipe){
        this.store.dispatch(new ShowError('ERROR: No recipe available to edit.'))
        return;
      }
      this.store.dispatch(new LoadRecipe(this.recipe.recipeId))
  }

  toggleMealPlan() {
    this.showMenu = !this.showMenu;
  }

  addToMealPlan(data: any) {
    if(!this.recipe) {
      this.store.dispatch(new ShowError('ERROR: No recipe available to add to meal plan.'))
      return;
    }

    this.store.dispatch(new AddToMealPlan(this.recipe, data.meal, data.date));
  }

  removeFromMealPlan() {
    if(!this.recipe) {
      this.store.dispatch(new ShowError('ERROR: No recipe available to remove from meal plan.'))
      return;
    }

    this.store.dispatch(new RemoveFromMealPlan(this.mealPlanType));
  }

  navigateToRecipe() {
    this.store.dispatch(new Navigate([`/recipe/${this.recipe.recipeId}`]))
  }

  getRatingValue(index: number) {
    this.recipe?.rating ?? 0;
    return this.recipe?.rating - index + 1;
  }

  getStarName(rating: number): string {
    if (rating >= 1 || rating <= 0 || Number.isNaN(rating)) {
      return 'star';
    }
    else {
      return 'star-half';
    }
  }

  getStarClass(rating: number | undefined): string {
    if (rating === undefined) {
      return 'ion-star'; // or any other default class for an empty star
    }

    if (rating >= 0.75) {
      return 'star-filled';
    }
    else if (rating >= 0.5) {
      return 'star-half-filled';
    }
    else if (rating >= 0.25) {
      return 'star-quarter-filled';
    }
    else {
      return 'ion-star';
    }
  }

}
