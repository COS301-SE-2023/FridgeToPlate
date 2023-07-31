import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { HomeState } from './home.state';

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forFeature([HomeState]),
  ],
})
export class HomeDataAccessModule {}
