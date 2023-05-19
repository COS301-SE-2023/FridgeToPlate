import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateRouting } from './create.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreatePage } from './create.page';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    CreateRouting,
    ReactiveFormsModule],
    declarations: [CreatePage]
})
export class CreateModule {}
