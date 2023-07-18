import { Component, Input, OnInit } from '@angular/core';
import { ProfileState } from '@fridge-to-plate/app/profile/data-access';
import { IProfile, RemoveSavedRecipe, SaveRecipe, UpdateProfile } from '@fridge-to-plate/app/profile/utils';
import { IRecipeDesc } from '@fridge-to-plate/app/recipe/utils';
import { Select, Store } from '@ngxs/store';
import { Observable, take } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router'; 
import { ShowError } from '@fridge-to-plate/app/error/utils';
import { AddToMealPlan, GetMealPlan, IMealPlan, RemoveFromMealPlan } from '@fridge-to-plate/app/meal-plan/utils';
import { MealPlanState } from '@fridge-to-plate/app/meal-plan/data-access';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent implements OnInit {
  
  @Select(ProfileState.getProfile) profile$ !: Observable<IProfile | null>;
  @Select(MealPlanState.getMealPlan) mealPlan$ !: Observable<IMealPlan | null>;

  @Input() recipe !: any;
  bookmarked = false;
  editable = true;
  profile !: IProfile;
  added = false;
  mealPlan !: IMealPlan;

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
    this.store.dispatch( new GetMealPlan(this.profile.username))
    this.mealPlan$.pipe(take(1)).subscribe(mealPlan => {
      if(mealPlan) {
        this.mealPlan = mealPlan;
        this.added = this.checkMealPlan(mealPlan);
      }
      else {
        this.store.dispatch(new ShowError("Error: Something is wrong with the mealPlan"))
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
      
      this.router.navigate([
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

    this.store.dispatch( new AddToMealPlan(mealPlan) );
    this.profile.currMealPlan = mealPlan;
    this.store.dispatch ( new UpdateProfile(this.profile) )
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

    this.mealPlan$.pipe(take(1)).subscribe(mealPlan => {
      if(mealPlan) {
        this.mealPlan = mealPlan;
        this.added = this.checkMealPlan(mealPlan);
        this.profile.currMealPlan = mealPlan;
        this.store.dispatch( new UpdateProfile(this.profile))
      }
      else {
        this.store.dispatch( new ShowError("Error: Something is wrong with the mealPlan"))
      }
    });
    this.added = false;
  }

  checkMealPlan(mealPlan : IMealPlan): boolean {

    if(mealPlan.breakfast) {
      console.log('Breakfast')
      return true;
    }
    if(mealPlan.lunch) {
      console.log('Lunch')
      return true;
    }
    if(mealPlan.dinner) {
      console.log('Dinner')
      return true;
    }
    if(mealPlan.snack) {
      console.log('snack')
      return true;
    }

    return false;
  }

}
