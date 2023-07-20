import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ProfilePage } from './profile.page';
import { ProfileRouting } from './profile.routing';
import { RecipeUIModule } from '@fridge-to-plate/app/recipe/ui';
import { ProfileUiModule } from '@fridge-to-plate/app/profile/ui';
import { NavigationBarModule } from '@fridge-to-plate/app/navigation/feature';
import { ProfileDataAccessModule } from '@fridge-to-plate/app/profile/data-access';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ClickedOutsideDirective } from 'libs/app/core/src/directives/clicked-outside.directive';
import { NotificationsFeatureModule } from '@fridge-to-plate/app/notifications/feature';
import { NzListModule } from 'ng-zorro-antd/list';

@NgModule({
  imports: [
    CommonModule,
    ProfileRouting,
    IonicModule,
    RecipeUIModule,
    ProfileUiModule,
    NavigationBarModule,
    ProfileDataAccessModule,
    NotificationsFeatureModule,
    NzListModule,
  ],
  declarations: [ProfilePage, ClickedOutsideDirective],
})
export class ProfileModule {}
