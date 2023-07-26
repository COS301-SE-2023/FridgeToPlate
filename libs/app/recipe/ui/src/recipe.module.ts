import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { IonicModule } from '@ionic/angular';
import { TempRecipeCardComponent } from './temp-recipe-card/temp-recipe-card.component';
import { ProfileDataAccessModule } from '@fridge-to-plate/app/profile/data-access';
import { MealPlanDataAccessModule } from '@fridge-to-plate/app/meal-plan/data-access';
import { FormsModule } from '@angular/forms';
import { MealPlanModalComponent } from './meal-plan-modal/meal-plan-modal.component';

@NgModule({
  imports: [
    CommonModule, 
    IonicModule,
    ProfileDataAccessModule,
    MealPlanDataAccessModule,
    FormsModule
  ],
  declarations: [
    RecipeCardComponent, 
    TempRecipeCardComponent,
    MealPlanModalComponent
  ],
  exports: [
    RecipeCardComponent,
    TempRecipeCardComponent,
  ],
})
export class RecipeUIModule {}
