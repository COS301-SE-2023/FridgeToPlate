import { Component, OnInit } from '@angular/core';
import { IRecipe, RetrieveRecipe } from '@fridge-to-plate/app/recipe/utils';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Select, Store, Actions, ofActionSuccessful } from '@ngxs/store';
import { RecipeState } from '@fridge-to-plate/app/recipe/data-access';
import { Observable } from 'rxjs';
import { ShowError } from '@fridge-to-plate/app/error/utils';
import { Navigate } from '@ngxs/router-plugin';
import {
  actionsExecuting,
  ActionsExecuting,
} from '@ngxs-labs/actions-executing';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'recipe-page',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class RecipePage implements OnInit {
  @Select(RecipeState.getRecipe) recipe$!: Observable<IRecipe>;
  @Select(actionsExecuting([RetrieveRecipe]))
  busy$!: Observable<ActionsExecuting>;
  recipe: IRecipe | undefined = undefined;
  errorMessage: string | undefined;
  forceLoading = true;
  safeUrl: SafeResourceUrl;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private store: Store,
    private actions$: Actions,
    private _sanitizer: DomSanitizer
  ) {}

  isDescriptionExpanded = false;
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
}
