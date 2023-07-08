import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Review } from './review.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  declarations: [Review],
  exports: [Review]
})
export class ReviewModule {}
