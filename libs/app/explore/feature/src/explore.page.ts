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

  page = "searching";

  allCategories : IExplore[] = [
    {
      type: "breakfast",
      search: "",
      tags: [],
      difficulty: "Easy",
    },
    {
      type: "snack",
      search: "",
      tags: [],
      difficulty: "Easy",
    },
    {
      type: "lunch",
      search: "",
      tags: [],
      difficulty: "Easy",
    },
    {
      type: "dessert",
      search: "",
      tags: [],
      difficulty: "Easy",
    },
    {
      type: "dinner",
      search: "",
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
