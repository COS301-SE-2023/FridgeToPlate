import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { IonicModule } from '@ionic/angular';
import { TempRecipeCardComponent } from './temp-recipe-card/temp-recipe-card.component';
import { ProfileDataAccessModule } from '@fridge-to-plate/app/profile/data-access';
import { FormsModule } from '@angular/forms';
import { MealPlanModalComponent } from './meal-plan-modal/meal-plan-modal.component';
import { NgxsModule } from '@ngxs/store';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { RecipeState } from '../../data-access/src/recipe.state';

@NgModule({
  imports: [
    CommonModule, 
    IonicModule,
    ProfileDataAccessModule,
    FormsModule,
    NgxsModule.forFeature([RecipeState])
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
