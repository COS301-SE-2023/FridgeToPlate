import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CreateRouting } from './create.routing'
import { CreatePagComponent } from './create.page';
import { IonicModule } from '@ionic/angular';
import { NavigationBarModule } from '@fridge-to-plate/app/navigation/feature'
import { ProfileDataAccessModule } from '@fridge-to-plate/app/profile/data-access';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CreateRouting,
    IonicModule,
    NavigationBarModule,
    ProfileDataAccessModule
  ],
  declarations: [CreatePagComponent],
})
export class CreateModule {}
