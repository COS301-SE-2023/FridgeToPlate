import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchingModalComponent } from './searching-modal/searching-modal.component';
import { ExploreCardComponent } from './explore-card/explore-card.component';
import { ResultsModalComponent } from './results-modal/results-modal.component';
import { NgxsModule } from '@ngxs/store';
import { ExploreState } from '@fridge-to-plate/app/explore/data-access';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxsModule.forRoot([ExploreState]),
  ],
  declarations: [SearchingModalComponent, ExploreCardComponent, ResultsModalComponent],
  exports: [SearchingModalComponent, ExploreCardComponent, ResultsModalComponent]
})
export class ExploreUIModule {}
