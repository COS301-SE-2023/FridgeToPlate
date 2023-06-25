import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecommendRouting } from './recommend.routing';
import { IonicModule } from '@ionic/angular';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzListModule } from 'ng-zorro-antd/list';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RecommendUIModule } from '../../ui/src';
import { RecommendPage } from './recommend.page';
import { RecipeUIModule } from '@fridge-to-plate/app/recipe/ui';
import { RecommendDataAccessModule } from '../../data-access/src/recommend.module';
import { NavigationBarModule } from '@fridge-to-plate/app/navigation/feature';

@NgModule({
  imports: [
    CommonModule,
    RecommendRouting,
    IonicModule,
    NzStepsModule,
    NzListModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    RecommendUIModule,
    RecommendDataAccessModule,
    NavigationBarModule,
  ],
  declarations: [RecommendPage],
  exports: [RecommendPage],
})
export class RecommendModule {}
