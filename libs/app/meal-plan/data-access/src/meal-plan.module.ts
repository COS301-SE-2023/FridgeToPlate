import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealPlanState } from './meal-plan.state';
import { NgxsModule } from '@ngxs/store';

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forFeature([MealPlanState])
  ],
})
export class MealPlanDataAccessModule {}
