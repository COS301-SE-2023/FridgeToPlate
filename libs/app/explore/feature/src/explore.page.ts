import { Component, Input } from '@angular/core';
import { Select, Store, NgxsModule } from '@ngxs/store';
import { ExploreState } from "@fridge-to-plate/app/explore/data-access";
import { CategorySearch, IExplore } from '@fridge-to-plate/app/explore/utils';
import { Observable, take } from "rxjs";
import { NavigationBar } from "@fridge-to-plate/app/navigation/feature";
import { Navigate } from "@ngxs/router-plugin";
import { IRecipe } from "@fridge-to-plate/app/recipe/utils"
import { RecipeUIModule } from "@fridge-to-plate/app/recipe/ui";

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
  searchText = "";
  editExplore !: IExplore;
  searchObject !: IExplore;


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
    {
      type: "soup",
      search: "",
      tags: [],
      difficulty: "Any",
    },
    {
      type: "drink",
      search: "",
      tags: [],
      difficulty: "Any",
    },
    {
      type: "salad",
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

    this.subpage = "searchAppliedByCaterogry"
    this.showRecipes = false;
    this.loading = true;

    this.store.dispatch(new CategorySearch(search));

    this.recipes$.subscribe( (recipes) => {
      if(recipes.length > 0){
        this.retunedRecipes = recipes;
      }
    })

    this.loading = false;
    this.showRecipes = true;
  }

  explorer(searchText: string) {

    if (searchText.length > 0) {
      this.showCategories = false;
      this.loading = true;
      this.showRecipes = false;
    }
    else {
      this.loading = false;
      this.showRecipes = false;
      this.showCategories = true;
      this.subpage = "beforeSearchApplied";
      
      return;
    }

    this.searchObject =
      {
        type: "",
        search: searchText,
        tags: [],
        difficulty: "Any",
      };

    this.store.dispatch(new CategorySearch(this.searchObject));


    this.recipes$.subscribe( (recipes) => {
      if(recipes.length > 0){
        this.retunedRecipes = recipes;
      }
    });

    this.loading = false;
    this.showRecipes = true;

  }

  clearSearch(){
    this.subpage = "beforeSearchApplied";
    this.showCategories = true;
    this.showRecipes = false;
    this.loading = false;
  }

}
