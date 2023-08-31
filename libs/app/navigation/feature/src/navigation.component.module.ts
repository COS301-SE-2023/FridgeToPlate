import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBar } from './';
import { IonicModule } from '@ionic/angular';
import { ProfileService } from '@fridge-to-plate/app/profile/utils';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [NavigationBar],
  exports: [NavigationBar],
  providers: [ProfileService]
})
export class NavigationBarModule {}
