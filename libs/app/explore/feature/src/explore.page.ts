import { Component } from '@angular/core';
import { IExplore } from '@fridge-to-plate/app/explore/utils';
import { NavigationBar } from "@fridge-to-plate/app/navigation/feature";
import { Navigate } from "@ngxs/router-plugin";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'explore-page',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss']
})

// eslint-disable-next-line @angular-eslint/component-class-suffix
export class ExplorePage {

  displaySearch = "block";

}
