import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ProfilePage } from './profile.page';
import { ProfileRouting } from './profile.routing';
import { RecipeUIModule } from '@fridge-to-plate/app/recipe/ui';
import { IngredientUIModule } from '@fridge-to-plate/app/ingredient/ui';
import { ProfileUiModule } from '@fridge-to-plate/app/profile/ui';
import { NavigationBarModule } from '@fridge-to-plate/app/navigation/feature'
import { ProfileDataAccessModule } from '@fridge-to-plate/app/profile/data-access';
import { ClickedOutsideDirective } from 'libs/app/core/src/directives/clicked-outside.directive';

@NgModule({
  imports: [
    CommonModule,
    ProfileRouting,
    IonicModule,
    RecipeUIModule,
    IngredientUIModule,
    ProfileUiModule,
    NavigationBarModule,
    ProfileDataAccessModule
  ],
  declarations: [
    ProfilePage, 
    ClickedOutsideDirective
  ],
})
export class ProfileModule {}
