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
      exploreType: "breakfast",
      name: "",
      tags: [],
      difficulty: "Easy",
    },
    {
      exploreType: "snack",
      name: "",
      tags: [],
      difficulty: "Easy",
    },
    {
      exploreType: "lunch",
      name: "",
      tags: [],
      difficulty: "Easy",
    },
    {
      exploreType: "dessert",
      name: "",
      tags: [],
      difficulty: "Easy",
    },
    {
      exploreType: "supper",
      name: "",
      tags: [],
      difficulty: "Easy",
    },
    {
      exploreType: "side dish",
      name: "",
      tags: [],
      difficulty: "Easy",
    },
    {
      exploreType: "fingerfood",
      name: "",
      tags: [],
      difficulty: "Easy",
    },
    {
      exploreType: "soup",
      name: "",
      tags: [],
      difficulty: "Easy",
    },
  ];


  constructor(private store: Store) {

  }

  displaySearch = "block";


  // eslint-disable-next-line @typescript-eslint/ban-types
  searchCategory(category : String) {
    alert(category);
  }

}
