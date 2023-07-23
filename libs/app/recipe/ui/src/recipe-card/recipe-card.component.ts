import { Component, Input, OnInit, NgZone  } from '@angular/core';
import { ProfileState } from '@fridge-to-plate/app/profile/data-access';
import { IProfile, RemoveSavedRecipe, SaveRecipe, UpdateProfile } from '@fridge-to-plate/app/profile/utils';
import { IRecipeDesc } from '@fridge-to-plate/app/recipe/utils';
import { Select, Store } from '@ngxs/store';
import { Observable, take } from 'rxjs';
import { Router } from '@angular/router'; 
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
  showMenu = false;
  selectedMealType : 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Dessert' | null = null;

  constructor(private store: Store, private router: Router, private ngZone: NgZone ) {}

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
      this.ngZone.run( ()=> {
        this.router.navigate( [
          'edit-recipe'
        ],
        { queryParams: { 
          recipeId: JSON.stringify(this.recipe.recipeId) 
        }})
      })
  }
  toggleDropdown() {
    this.showMenu = !this.showMenu;
  }

  addToMealPlan() {
    if(!this.recipe) {
      this.store.dispatch( new ShowError('ERROR: No recipe available to add to meal plan.'))
      return;
    }

    switch(this.selectedMealType) {
      case 'Breakfast':
        if(this.mealPlan.breakfast){
          this.store.dispatch( new ShowError('ERROR: Breakfast already selected.'))
          return; 
        }
        this.mealPlan.breakfast = this.recipe;
        break;
      case 'Lunch':
        if(this.mealPlan.lunch){
          this.store.dispatch( new ShowError('ERROR: Lunch already selected.'))
          return;
        }
        this.mealPlan.lunch = this.recipe;
        break;
      case 'Dinner':
        if(this.mealPlan.dinner){
          this.store.dispatch( new ShowError('ERROR: Dinner already selected.'))
          return;
        }
        this.mealPlan.dinner = this.recipe;
        break;
      case 'Snack':
        if(this.mealPlan.snack){
          this.store.dispatch( new ShowError('ERROR: Snack already selected.'))
          return;
        }
        this.mealPlan.snack = this.recipe;
        break;
      default:
        this.store.dispatch( new ShowError('ERROR: No meal type selected.'))
        return;
    }

    this.mealPlan.username = this.profile.username;
    this.mealPlan.date = new Date().toISOString().slice(0, 10);

    this.store.dispatch( new AddToMealPlan(this.mealPlan) );
    this.profile.currMealPlan = this.mealPlan;
    // this.store.dispatch ( new UpdateProfile(this.profile) )
    this.selectedMealType = null;
    this.added = true;
    this.toggleDropdown();    
  }

  removeFromMealPlan() {
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
