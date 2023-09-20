import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ExploreState } from "@fridge-to-plate/app/explore/data-access";
import { CategorySearch, IExplore } from '@fridge-to-plate/app/explore/utils';
import {Observable, take} from "rxjs";
import { IRecipe } from "@fridge-to-plate/app/recipe/utils"
import {keywordsArray} from "@fridge-to-plate/app/recommend/utils";

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

  searchHistoryArray: string[] = [];

  page = "searching";
  retunedRecipes: IRecipe[];
  subpage = "beforeSearchApplied";
  loading = false;
  showRecipes = false;
  showCategories = true;
  currSearch = false;
  editExplore !: IExplore;
  searchObject !: IExplore;
  searchTerm = "";
  isSearchOverlayVisible = false;
  selectedFilters: string[] = [];
  showAllFilters = false;
  isDirectiveActive = true;

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

  protected readonly keywordsArray = keywordsArray;

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

      this.searchTerm = search.type;
    })

  }

  explorer(searchText: string) {

    if (searchText.length > 0) {
      this.searchTerm = searchText;
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
        tags: this.selectedFilters,
        difficulty: "",
      };

    if(!this.searchHistoryArray.includes(searchText)){
      this.searchHistoryArray.push(searchText);
    }

    this.store.dispatch(new CategorySearch(this.searchObject));

    this.recipes$.pipe(take(1)).subscribe( (recipes) => {
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

  showSearchOverlay(){
    if(!this.isSearchOverlayVisible){
      this.isSearchOverlayVisible = true;
    }
  }

  hideSearchOverlay(){
    if(this.isSearchOverlayVisible && this.isDirectiveActive){
      this.isSearchOverlayVisible = false;
    }
    if(!this.isDirectiveActive) {
      this.isDirectiveActive = true;
    }
  }

  searchFromHistory(pastTerm: string){
    if(pastTerm.length !== 0 ){
      this.searchTerm = pastTerm;
      this.showCategories = false;
      this.loading = true;
      this.showRecipes = false;
      this.currSearch = true;

      this.searchObject =
        {
          type: "",
          search: pastTerm,
          tags: this.selectedFilters,
          difficulty: "",
        };

      this.store.dispatch(new CategorySearch(this.searchObject));

      this.recipes$.pipe(take(1)).subscribe( (recipes) => {
        if(recipes && recipes.length > 0 && this.currSearch){
          this.retunedRecipes = recipes;
          this.loading = false;
          this.showRecipes = true;
          this.currSearch = false;
        }
      });
    }
  }

  showSearchFilters(){
    this.isDirectiveActive = false;
    if(!this.showAllFilters){
      this.showAllFilters = true;
      return;
    }
  }

  hideSearchFilters() {
    this.isDirectiveActive = false;
    if(this.showAllFilters){
      this.showAllFilters = false;
      return;
    }
  }


  removeFromFilters(filterToRemove: string){
    if(!filterToRemove || (this.selectedFilters.length <= 0 || !this.selectedFilters.includes(filterToRemove)))
    {
      return;
    }

    else{
      this.selectedFilters = this.selectedFilters.filter((filter) => filter !== filterToRemove);
    }
  }

  addToFilters(filter: string){
    if(!filter || this.selectedFilters.length >= 3)
    {
      return;
    }

    else if(this.selectedFilters.includes(filter)){
      this.removeFromFilters(filter);
    }
    else{
      this.selectedFilters.push(filter);
    }
  }
  clearFilters(){
    this.selectedFilters = [];
  }

  applyFilters(){
    if(this.selectedFilters.length > 0){
      this.searchFromHistory(this.searchTerm ?? '');
    }

  this.hideSearchFilters();
  }
}
