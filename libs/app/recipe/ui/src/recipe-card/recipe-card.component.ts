import { Component, Input, OnInit } from '@angular/core';
import { ProfileState } from '@fridge-to-plate/app/profile/data-access';
import { IProfile, RemoveSavedRecipe, SaveRecipe } from '@fridge-to-plate/app/profile/utils';
import { IRecipeDesc } from '@fridge-to-plate/app/recipe/utils';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router'; 
import { ShowError } from '@fridge-to-plate/app/error/utils';
import { AddToMealPlan, IMealPlan, RemoveFromMealPlan } from '@fridge-to-plate/app/meal-plan/utils';

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
  profile !: IProfile;
  added = false;

  constructor(private store: Store, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.profile$.subscribe(profile => {
      if (profile !== null && this.recipe !== undefined) {
        this.bookmarked = profile.savedRecipes.includes(this.recipe as IRecipeDesc);
        this.editable = profile.createdRecipes.includes(this.recipe as IRecipeDesc);
        this.profile = profile;
      } else {
        this.bookmarked = false;
        this.editable = false;
      }
    });
  }

  changeSaved() {
    if (this.bookmarked) {
      this.store.dispatch(new RemoveSavedRecipe(this.recipe as IRecipeDesc));
    } else {
      this.store.dispatch(new SaveRecipe(this.recipe as IRecipeDesc));
    }
  }

  edit() {

      if(!this.recipe){
        this.store.dispatch( new ShowError('ERROR: No recipe available to edit.'))
        return;
      }
      
      this.router.navigate( [
        'edit-recipe'
      ],
      { queryParams: { 
        recipeId: JSON.stringify(this.recipe.recipeId) 
      }})
  }

  addToMealPlan() {

    if(!this.recipe) {
      this.store.dispatch( new ShowError('ERROR: No recipe available to add to meal plan.'))
      return;
    }

    const mealPlan: IMealPlan = {
      username: this.profile.username,
      date: new Date().toISOString().slice(0, 10),
      breakfast: null,
      lunch: this.recipe as IRecipeDesc,
      dinner: null,
      snack: null
    }

    this.store.dispatch(new AddToMealPlan(mealPlan) );
    this.added = true;    
  }

  removeFromMealPlan() {
    console.log("remove from Meal Plan")
    if(!this.profile) {
      this.store.dispatch( new ShowError('ERROR: No profile available to remove from meal plan.'))
      return;
    }

    if(!this.recipe) {
      this.store.dispatch( new ShowError('ERROR: No recipe available to remove from meal plan.'))
      return;
    }
    this.store.dispatch( new RemoveFromMealPlan(this.profile.username, this.recipe.recipeId))
    this.added = false;
  }

}
