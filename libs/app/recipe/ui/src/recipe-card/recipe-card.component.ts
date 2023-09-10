import { Component, Input, OnInit, NgZone  } from '@angular/core';
import { ProfileState } from '@fridge-to-plate/app/profile/data-access';
import { AddToMealPlan, IProfile, RemoveFromMealPlan, RemoveSavedRecipe, SaveRecipe } from '@fridge-to-plate/app/profile/utils';
import { IRecipeDesc, IncreaseViews } from '@fridge-to-plate/app/recipe/utils';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ShowError } from '@fridge-to-plate/app/error/utils';
import { IMealPlan } from '@fridge-to-plate/app/meal-plan/utils';
import { Navigate } from '@ngxs/router-plugin';
import { LoadRecipe } from '@fridge-to-plate/app/edit-recipe/utils';
import { RecipeState } from '@fridge-to-plate/app/recipe/data-access';

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
  added = false;
  showMenu = false;
  mealType!: "Breakfast" | "Lunch" | "Dinner" | "Snack";

  constructor(private store: Store, private router: Router, private ngZone: NgZone ) {}
  ngOnInit(): void {
    this.profile$.subscribe(profile => {
      if (profile !== null && this.recipe !== undefined) {
        this.bookmarked = profile.savedRecipes.some((object) => object.recipeId === this.recipe.recipeId);
        this.editable = profile.createdRecipes.some((object) => object.recipeId === this.recipe.recipeId);
        this.added = this.checkMealPlan(profile.currMealPlan);
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

  addToMealPlan(meal: string) {
    if(!this.recipe) {
      this.store.dispatch(new ShowError('ERROR: No recipe available to add to meal plan.'))
      return;
    }

    this.mealType = meal as "Breakfast" | "Lunch" | "Dinner" | "Snack"

    this.store.dispatch(new AddToMealPlan(this.recipe, this.mealType));
    this.added = true;
  }

  removeFromMealPlan() {
    if(!this.recipe) {
      this.store.dispatch(new ShowError('ERROR: No recipe available to remove from meal plan.'))
      return;
    }

    this.store.dispatch(new RemoveFromMealPlan(this.recipe.recipeId));
    this.added = false;
  }

  checkMealPlan(mealPlan : IMealPlan | null): boolean {
    if (mealPlan === null) {
      return false;
    }

    if(mealPlan.breakfast?.recipeId === this.recipe.recipeId) {
      return true;
    }

    if(mealPlan.lunch?.recipeId === this.recipe.recipeId) {
      return true;
    }

    if(mealPlan.dinner?.recipeId === this.recipe.recipeId) {
      return true;
    }

    if(mealPlan.snack?.recipeId === this.recipe.recipeId) {
      return true;
    }

    return false;
  }

  navigateToRecipe() {
    this.store.dispatch(new IncreaseViews(1));
    this.store.dispatch(new Navigate([`/recipe/${this.recipe.recipeId}`]))
  }

  getRatingValue(index: number) {
    this.recipe?.rating ?? 0;
    return this.recipe?.rating - index + 1;
  }

  getStarName(rating: number): string {
    if (rating >= 1 || rating <= 0) {
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
