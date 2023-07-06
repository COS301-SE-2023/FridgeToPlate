import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CreateRouting } from './create.routing'
import { CreatePagComponent } from './create.page';
import { IonicModule } from '@ionic/angular';
import { NavigationBarModule } from '@fridge-to-plate/app/navigation/feature'
import { CreateDataAccessModule } from '@fridge-to-plate/app/create/data-access';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CreateRouting,
    IonicModule,
    NavigationBarModule,
    CreateDataAccessModule
  ],
  declarations: [CreatePagComponent],
})
export class CreateModule {}
