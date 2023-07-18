import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxsModule} from "@ngxs/store";
import {RecommendState} from "./recommend.state";
import { ProfileState } from "@fridge-to-plate/app/profile/data-access";

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forFeature([RecommendState, ProfileState])
  ],
})
export class RecommendDataAccessModule {}
