import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileAPI } from './profile.api';
import { NgxsModule } from '@ngxs/store';
import { ProfileState } from './profile.state';
import { MealPlanState } from '@fridge-to-plate/app/meal-plan/data-access';

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forFeature([ProfileState, MealPlanState])
  ],
  providers: [ProfileAPI]
})
export class ProfileDataAccessModule {}
