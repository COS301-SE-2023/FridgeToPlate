import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAPI } from './create.api';
import { NgxsModule } from '@ngxs/store';
import { CreateState } from './create.state';

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forFeature([CreateState])
  ],
  providers: [CreateAPI],
})
export class CreateDataAccessModule {}
