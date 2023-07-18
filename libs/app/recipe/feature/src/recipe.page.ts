import { Component, OnInit } from '@angular/core';
import { RecipeService } from '@fridge-to-plate/app/recipe/data-access';
import { IRecipe } from '@fridge-to-plate/app/recipe/utils';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Select, Selector, Store } from '@ngxs/store';
import { GetRecipe } from '../../data-access/src/recipe.actions';
import { RecipeState } from '../../data-access/src/recipe.state';
import { Observable, take } from 'rxjs';
import { state } from '@angular/animations';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'recipe-page',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class RecipePage implements OnInit {
  @Select(RecipeState) recipe$!: Observable<IRecipe>;
  recipe !: IRecipe | undefined;
  errorMessage: string | undefined;

  constructor(
    private location: Location,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const recipeId = params.get('id');
      if (recipeId) {
        this.setRecipe(recipeId);
      }
    });
  }

  goBack() {
    this.location.back();
  }

  setRecipe(id: string) {
    if (!id || id.length == 0) {
      this.errorMessage = 'Invalid recipe ID.';
      this.recipe = undefined;
      return;
    }

    this.store.dispatch(new GetRecipe(id));
    this.recipe$.pipe(take(1)).subscribe(stateRecipe => {
      // console.log(Object.create(stateRecipe).recipe);
      this.recipe = Object.create(stateRecipe).recipe;
    });

    // Object.create(profile)
    // this.recipe$.pipe(take(1)).subscribe(recipe => {  this.recipe = recipe;})

    // this.recipeService.getRecipeById(id).subscribe(
    //   (response: IRecipe) => {
    //     this.recipe = response;
    //   },
    //   error => {
    //     this.errorMessage = 'Error retrieving recipe data.';
    //     this.recipe = undefined;
    //   }
    // );

  }
}

