import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { IonicModule } from '@ionic/angular';
import { TempRecipeCardComponent } from './temp-recipe-card/temp-recipe-card.component';
import { ProfileDataAccessModule } from '@fridge-to-plate/app/profile/data-access';
import { FormsModule } from '@angular/forms';
import { MealPlanModalComponent } from './meal-plan-modal/meal-plan-modal.component';
import { NgxsModule } from '@ngxs/store';
import { RecipeState } from '@fridge-to-plate/app/recipe/data-access';
import { CustomSkeletonLoaderComponent } from './custom-skeleton-loader/custom-skeleton-loader.component';
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ActualImageDirective } from 'libs/app/core/src/directives/img-load.directive';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ProfileDataAccessModule,
    FormsModule,
    NgxsModule.forFeature([RecipeState]),
    NgxSkeletonLoaderModule,
  ],
  declarations: [
    RecipeCardComponent,
    TempRecipeCardComponent,
    MealPlanModalComponent,
    CustomSkeletonLoaderComponent,
    ActualImageDirective
  ],
  exports: [RecipeCardComponent, TempRecipeCardComponent, CustomSkeletonLoaderComponent],
})
export class RecipeUIModule {}
