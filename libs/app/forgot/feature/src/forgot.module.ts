import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ForgotPage } from './forgot.page';
import { ForgotRouting } from './forgot.routing';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ForgotRouting,
    IonicModule,
    FormsModule,
  ],
  declarations: [ForgotPage],
})
export class ForgotModule {}
