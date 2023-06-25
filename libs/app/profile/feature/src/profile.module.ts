import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ProfilePage } from './profile.page';
import { ProfileRouting } from './profile.routing';
import { RecipeUIModule } from '@fridge-to-plate/app/recipe/ui';
import { IngredientUIModule } from '@fridge-to-plate/app/ingredient/ui';
import { ProfileUiModule } from '@fridge-to-plate/app/profile/ui';
import { NavigationBarModule } from '@fridge-to-plate/app/navigation/feature'

@NgModule({
  imports: [
    CommonModule,
    ProfileRouting,
    IonicModule,
    RecipeUIModule,
    IngredientUIModule,
    ProfileUiModule,
    NavigationBarModule
  ],
  declarations: [ProfilePage],
})
export class ProfileModule {}
