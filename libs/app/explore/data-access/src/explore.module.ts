import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { ExploreState } from './explore.state';

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forFeature([ExploreState])
  ],
  
})
export class ExploreDataAccessModule {}
