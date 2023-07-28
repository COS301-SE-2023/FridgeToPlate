import { Component, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ExploreState } from "@fridge-to-plate/app/explore/data-access";
import { IExplore } from '@fridge-to-plate/app/explore/utils';
import { Observable } from "rxjs";
import { NavigationBar } from "@fridge-to-plate/app/navigation/feature";
import { Navigate } from "@ngxs/router-plugin";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'explore-page',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})

// eslint-disable-next-line @angular-eslint/component-class-suffix
export class ExplorePage {

  @Select(ExploreState.getExplore) explore$ !: Observable<IExplore>;

  allCategories : IExplore[] = [
    {
      exploreType: "Breakfast",
      name: "",
      tags: [],
      difficulty: "Easy",
    },
    {
      exploreType: "Snack",
      name: "",
      tags: [],
      difficulty: "Easy",
    },
    {
      exploreType: "Lunch",
      name: "",
      tags: [],
      difficulty: "Easy",
    },
    {
      exploreType: "Dessert",
      name: "",
      tags: [],
      difficulty: "Easy",
    },
    {
      exploreType: "Supper",
      name: "",
      tags: [],
      difficulty: "Easy",
    },
    {
      exploreType: "Salads",
      name: "",
      tags: [],
      difficulty: "Easy",
    },
  ];


  constructor(private store: Store) {

  }

  displaySearch = "block";

}
