import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecommendRouting } from './help.routing';
import { IonicModule } from '@ionic/angular';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzListModule } from 'ng-zorro-antd/list';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { RecommendPage } from './help.page';
import { NavigationBarModule } from '@fridge-to-plate/app/navigation/feature';
import { RecommendDataAccessModule } from '@fridge-to-plate/app/recommend/data-access';
import { RecommendUIModule } from '@fridge-to-plate/app/recommend/ui';

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
