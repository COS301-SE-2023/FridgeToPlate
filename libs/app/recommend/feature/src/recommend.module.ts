import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RecommendationRouting} from "./recommend.routing";
import {IonicModule} from "@ionic/angular";
import {NzStepsModule} from "ng-zorro-antd/steps";
import {ItemEditStep} from "../../ui/src/item-edit-step/item-edit-step";
import {NzListModule} from "ng-zorro-antd/list";
import {ReactiveFormsModule} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzIconModule} from "ng-zorro-antd/icon";
import { RecommendUIModule } from '../../ui/src';

@NgModule({
  declarations: [
    ItemEditStep, 
  ],
  imports: [
    CommonModule, 
    RecommendationRouting, 
    IonicModule, 
    NzStepsModule, 
    NzListModule, 
    ReactiveFormsModule, 
    NzFormModule, 
    NzInputModule, 
    NzIconModule,
    RecommendUIModule
  ],
})
export class AppRecipeRecommendationModule {}
