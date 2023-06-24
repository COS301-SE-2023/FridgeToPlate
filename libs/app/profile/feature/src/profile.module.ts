import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ProfilePage } from './profile.page';
import { ProfileRouting } from './profile.routing';
import { RecipeUIModule } from '@fridge-to-plate/app/recipe/ui';
import { IngredientUIModule } from '@fridge-to-plate/app/ingredient/ui';
import { ProfileUiModule } from '@fridge-to-plate/app/profile/ui';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  imports: [
    CommonModule,
    ProfileRouting,
    IonicModule,
    RecipeUIModule,
    IngredientUIModule,
    ProfileUiModule,
  ],
  declarations: [ProfilePage],
})
export class ProfileModule {}
