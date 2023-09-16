import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ExploreState } from "@fridge-to-plate/app/explore/data-access";
import { CategorySearch, IExplore } from '@fridge-to-plate/app/explore/utils';
import { Observable } from "rxjs";
import { IRecipe } from "@fridge-to-plate/app/recipe/utils"

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'explore-page',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})

// eslint-disable-next-line @angular-eslint/component-class-suffix
export class ExplorePage {

  @Select(ExploreState.getExplore) explore$ !: Observable<IExplore>;
  @Select(ExploreState.getRecipes) recipes$ !: Observable<IRecipe[]>;

  page = "searching";
  retunedRecipes: any;
  subpage = "beforeSearchApplied";
  loading = false;
  showRecipes = false;
  showCategories = true;
  currSearch = false;
  editExplore !: IExplore;
  searchObject !: IExplore;


  allCategories : IExplore[] = [
    {
      type: "breakfast",
      search: "",
      tags: [],
      difficulty: "",
    },
    {
      type: "snack",
      search: "",
      tags: [],
      difficulty: "",
    },
    {
      type: "lunch",
      search: "",
      tags: [],
      difficulty: "",
    },
    {
      type: "dessert",
      search: "",
      tags: [],
      difficulty: "",
    },
    {
      type: "dinner",
      search: "",
      tags: [],
      difficulty: "",
    },
    {
      type: "soup",
      search: "",
      tags: [],
      difficulty: "",
    },
    {
      type: "beverage",
      search: "",
      tags: [],
      difficulty: "",
    },
    {
      type: "salad",
      search: "",
      tags: [],
      difficulty: "",
    },

  ];


  constructor(private store: Store) {

  }

  displaySearch = "block";


  // eslint-disable-next-line @typescript-eslint/ban-types
  search(search : IExplore) {

    this.subpage = "searchAppliedByCaterogry"
    this.showRecipes = false;
    this.loading = true;
    this.currSearch = true;

    this.store.dispatch(new CategorySearch(search));

    this.recipes$.subscribe( (recipes) => {
      if(recipes && recipes.length > 0 && this.currSearch){
        this.retunedRecipes = recipes;
        this.loading = false;
        this.showRecipes = true;
        this.currSearch = false;
      }
    })

  }

  explorer(searchText: string) {

    if (searchText.length > 0) {
      this.showCategories = false;
      this.loading = true;
      this.showRecipes = false;
      this.currSearch = true;
    }
    else {
      this.loading = false;
      this.showRecipes = false;
      this.showCategories = true;
      this.subpage = "beforeSearchApplied";
      this.currSearch = false;

      return;
    }

    this.searchObject =
      {
        type: "",
        search: searchText,
        tags: [],
        difficulty: "",
      };

    this.store.dispatch(new CategorySearch(this.searchObject));

    this.recipes$.subscribe( (recipes) => {
      if(recipes && recipes.length > 0 && this.currSearch){
        this.retunedRecipes = recipes;
        this.loading = false;
        this.showRecipes = true;
        this.currSearch = false;
      }
    });

  }

  clearSearch(){
    this.subpage = "beforeSearchApplied";
    this.showCategories = true;
    this.showRecipes = false;
    this.loading = false;
  }

}
