import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ProfilePage } from './profile.page';
import { ProfileRouting } from './profile.routing';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { RecipeUIModule } from '@fridge-to-plate/app/recipe/ui';
import { ProfileUiModule } from '@fridge-to-plate/app/profile/ui';
import { ProfileDataAccessModule } from '@fridge-to-plate/app/profile/data-access';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ClickedOutsideDirective } from 'libs/app/core/src/directives/clicked-outside.directive';
import { NotificationsFeatureModule } from '@fridge-to-plate/app/notifications/feature';
import { NzListModule } from 'ng-zorro-antd/list';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
  
@NgModule({
  imports: [
    CommonModule,
    ProfileRouting,
    IonicModule,
    RecipeUIModule,
    ProfileUiModule,
    ProfileDataAccessModule,
    NotificationsFeatureModule,
    NzListModule,
    FormsModule,
    NgChartsModule
  ],
  declarations: [ProfilePage, ClickedOutsideDirective],
  exports: [ClickedOutsideDirective],
})
export class ProfileModule {}
