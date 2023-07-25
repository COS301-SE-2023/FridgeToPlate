import { Component, Input, OnInit, NgZone  } from '@angular/core';
import { ProfileState } from '@fridge-to-plate/app/profile/data-access';
import { IProfile, RemoveSavedRecipe, SaveRecipe, UpdateMealPlan } from '@fridge-to-plate/app/profile/utils';
import { IRecipeDesc } from '@fridge-to-plate/app/recipe/utils';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'; 
import { ShowError } from '@fridge-to-plate/app/error/utils';
import { IMealPlan } from '@fridge-to-plate/app/meal-plan/utils';

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
  mealPlan !: IMealPlan;
  showMenu = false;
  selectedMealType : 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Dessert' | null = null;

  constructor(private store: Store, private router: Router, private ngZone: NgZone ) {}

  ngOnInit(): void {
    this.profile$.subscribe(profile => {
      if (profile !== null && this.recipe !== undefined) {
        this.bookmarked = profile.savedRecipes.includes(this.recipe as IRecipeDesc);
        this.editable = profile.createdRecipes.includes(this.recipe as IRecipeDesc);

        this.mealPlan = profile.currMealPlan ?? {
          username : profile.username,
          date : new Date().toISOString().slice(0, 10)
        } as IMealPlan
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
    if(this.mealPlan) {
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
    }
    else {
      this.store.dispatch( new ShowError("Something is fishy with the meal plan"))
      return;
    }
  
    this.store.dispatch( new UpdateMealPlan(this.mealPlan)); 
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

    if(this.mealPlan){
      if(this.mealPlan.breakfast?.recipeId === this.recipe.recipeId) {
        this.mealPlan.breakfast = null;
      }

      if(this.mealPlan.lunch?.recipeId === this.recipe.recipeId) {
        this.mealPlan.lunch = null;
      }

      if(this.mealPlan.dinner?.recipeId === this.recipe.recipeId) {
        this.mealPlan.dinner = null;
      }

      if(this.mealPlan.snack?.recipeId === this.recipe.recipeId) {
        this.mealPlan.snack = null;
      }

      this.store.dispatch( new UpdateMealPlan(this.mealPlan)); 
      this.added = false;
    }
    else {
      this.store.dispatch( new ShowError("Something is fishy with the meal plan"))
      return;
    }
   
  }

  checkMealPlan(mealPlan : IMealPlan): boolean {

    if(mealPlan.breakfast) {
      return true;
    }
    if(mealPlan.lunch) {
      return true;
    }
    if(mealPlan.dinner) {
      return true;
    }
    if(mealPlan.snack) {
      return true;
    }

    return false;
  }

}
