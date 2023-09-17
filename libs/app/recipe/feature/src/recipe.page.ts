import { Component, OnInit } from '@angular/core';
import { ChangeMeasurementType, IRecipe, RetrieveRecipe } from '@fridge-to-plate/app/recipe/utils';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Select, Store, Actions } from '@ngxs/store';
import { RecipeState } from '@fridge-to-plate/app/recipe/data-access';
import { Observable } from 'rxjs';
import { ShowError } from '@fridge-to-plate/app/error/utils';
import { Navigate } from '@ngxs/router-plugin';
import {
  actionsExecuting,
  ActionsExecuting,
} from '@ngxs-labs/actions-executing';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RecommendState } from '@fridge-to-plate/app/recommend/data-access';
import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'recipe-page',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class RecipePage implements OnInit {
  @Select(RecipeState.getRecipe) recipe$!: Observable<IRecipe>;
  @Select(RecommendState.getIngredients) ingredients$!: Observable<IIngredient[]>;
  @Select(actionsExecuting([RetrieveRecipe]))
  busy$!: Observable<ActionsExecuting>;
  recipe: IRecipe | undefined = undefined;
  errorMessage: string | undefined;
  forceLoading = true;
  measurementUnit = "metric";
  safeUrl: SafeResourceUrl;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private store: Store,
    private actions$: Actions,
    private _sanitizer: DomSanitizer
  ) {}

  hasTags = false;
  isDescriptionExpanded = false;
  ingredients: IIngredient[];
  iconColor = 'text-red-500';

  changeIconColor() {
    this.iconColor = 'text-green-600';
  }

  changeIconColorBack() {
    this.iconColor = 'text-red-500';
  }
  toggleDescriptionExpanded() {
    this.isDescriptionExpanded = !this.isDescriptionExpanded;
  }

  ngOnInit(): void {
    this.forceLoading = true;
    setTimeout(() => {
      this.forceLoading = false;
    }, 1000);
    this.route.paramMap.subscribe((params) => {
      const recipeId = params.get('id');
      if (recipeId) {
        this.setRecipe(recipeId);
      } else {
        this.store.dispatch(new ShowError('Invalid Recipe Id'));
      }
    });
    this.ingredients$.subscribe((ingredients) => {
      this.ingredients = ingredients;
    });

    if (this.recipe?.tags) {
      this.hasTags = true;
    }
  }

  goBack() {
    this.location.back();
  }

  setRecipe(id: string) {
    if (id || id != '' || id.length > 0) {
      this.store.dispatch(new RetrieveRecipe(id));
      this.recipe$.subscribe((stateRecipe) => {
        this.recipe = stateRecipe;
        if (stateRecipe.youtubeId)
          this.safeUrl = this._sanitizer.bypassSecurityTrustResourceUrl(
            `https://www.youtube.com/embed/${this.recipe.youtubeId}`
          );
      });
    } else {
      this.store.dispatch(new ShowError('Invalid Recipe Id'));
      return;
    }
  }

  goHome() {
    this.store.dispatch(new Navigate(['/home']));
  }

  changeIngredientUnits() {
    this.store.dispatch(new ChangeMeasurementType(this.measurementUnit));
  }
}
