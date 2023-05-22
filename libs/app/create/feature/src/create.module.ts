import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateRouting } from './create.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreatePage } from './create.page';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    CreateRouting,
    IonicModule,
    ReactiveFormsModule
  ],
  declarations: [CreatePage],
  exports: [
    ReactiveFormsModule
  ]
})
export class CreateModule {}