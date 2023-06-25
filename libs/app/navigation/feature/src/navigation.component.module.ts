import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBar } from './';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [NavigationBar],
  exports: [NavigationBar]
})
export class NavigationBarModule {}
