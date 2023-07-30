import { Component, OnInit } from '@angular/core';
import { IRecipe, RetrieveRecipe } from '@fridge-to-plate/app/recipe/utils';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Select, Store, ofActionSuccessful, Actions } from '@ngxs/store';
import { RecipeState } from '@fridge-to-plate/app/recipe/data-access';
import { Observable } from 'rxjs';
import { ActionsExecuting, actionsExecuting } from '@ngxs-labs/actions-executing';
import { ShowError } from '@fridge-to-plate/app/error/utils';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'recipe-page',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class RecipePage implements OnInit {
  @Select(actionsExecuting([RetrieveRecipe])) busy$ !: Observable<ActionsExecuting>;
  ShowErrorSuccessful$ = this.actions$.pipe(ofActionSuccessful(ShowError));
  @Select(RecipeState.getRecipe) recipe$!: Observable<IRecipe>;
  recipe: IRecipe | undefined = undefined;
  errorMessage: string | undefined;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private store: Store,
    private actions$: Actions
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const recipeId = params.get('id');
      if (recipeId) {
        this.setRecipe(recipeId);
      }
      else {
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
      });
    }
    else {
      this.store.dispatch(new ShowError('Invalid Recipe Id'));
      return;
    }
    
   
  }

  goHome() {
    this.store.dispatch(new Navigate(['/home']));
  }
}
