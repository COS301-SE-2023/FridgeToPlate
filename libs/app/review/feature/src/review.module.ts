import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Review } from './review.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [Review],
  exports: [Review]
})
export class ReviewModule {}
