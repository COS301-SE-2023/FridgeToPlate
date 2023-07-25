import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ForgotPage } from './forgot.page';
import { ForgotRouting } from './forgot.routing';
import { FormsModule } from '@angular/forms';
import { ForgotUIModule } from '@fridge-to-plate/app/forgot/ui';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ForgotRouting,
    IonicModule,
    FormsModule,
    ForgotUIModule,
  ],
  declarations: [ForgotPage],
})
export class ForgotModule {}
