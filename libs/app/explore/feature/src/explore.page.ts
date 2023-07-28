import { Component, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ExploreState } from "@fridge-to-plate/app/explore/data-access";
import { CategorySearch, IExplore } from '@fridge-to-plate/app/explore/utils';
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
  @Select(ExploreState.getRecipes) recipes$ !: Observable<IExplore>;

  page = "searching";

  allCategories : IExplore[] = [
    {
      type: "breakfast",
      search: "",
      tags: [],
      difficulty: "Any",
    },
    {
      type: "snack",
      search: "",
      tags: [],
      difficulty: "Any",
    },
    {
      type: "lunch",
      search: "",
      tags: [],
      difficulty: "Any",
    },
    {
      type: "dessert",
      search: "",
      tags: [],
      difficulty: "Any",
    },
    {
      type: "dinner",
      search: "",
      tags: [],
      difficulty: "Any",
    },

  ];


  constructor(private store: Store) {

  }

  displaySearch = "block";


  // eslint-disable-next-line @typescript-eslint/ban-types
  search(search : IExplore) {
    this.store.dispatch(new CategorySearch(search));
  }

}
