import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CreateRouting } from './create.routing'
import { CreatePage } from './create.page';
import { IonicModule } from '@ionic/angular';
import { NavigationBarModule } from '@fridge-to-plate/app/navigation/feature'

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CreateRouting,
    IonicModule,
    NavigationBarModule
  ],
  declarations: [CreatePage],
})
export class CreateModule {}
