import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CreateRouting } from './create.routing'
import { CreatePage } from './create.page';
import { IonicModule } from '@ionic/angular';
import { NavigationBarModule } from '@fridge-to-plate/app/navigation/feature'
import { AppCreateDataAccessModule } from '@fridge-to-plate/app/create/data-access';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CreateRouting,
    IonicModule,
    NavigationBarModule,
    // AppCreateDataAccessModule
  ],
  declarations: [CreatePage],
})
export class CreateModule {}
