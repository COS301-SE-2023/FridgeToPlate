import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { ErrorState } from './error.state';

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forFeature([ErrorState]),
  ],
})
export class ErrorDataAccessModule {}
