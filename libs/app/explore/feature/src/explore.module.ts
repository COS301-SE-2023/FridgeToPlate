/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreRouting } from './explore.routing';
import { IonicModule } from '@ionic/angular';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzListModule } from 'ng-zorro-antd/list';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ExploreUIModule } from '@fridge-to-plate/app/explore/ui';
import { ExplorePage } from './explore.page';
import { RecipeUIModule } from '@fridge-to-plate/app/recipe/ui';
import { ExploreDataAccessModule } from '@fridge-to-plate/app/explore/data-access';
import { NavigationBarModule } from '@fridge-to-plate/app/navigation/feature';
import { RecipeModule } from "@fridge-to-plate/app/recipe/feature";
import {ProfileModule} from "@fridge-to-plate/app/profile/feature";


@NgModule({
  imports: [
    CommonModule,
    ExploreRouting,
    IonicModule,
    NzStepsModule,
    NzListModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    ExploreUIModule,
    ExploreDataAccessModule,
    NavigationBarModule,
    RecipeModule,
    RecipeUIModule,
    ProfileModule
  ],
  declarations: [ExplorePage],
  exports: [ExplorePage],
})
export class ExploreModule {}
