import { Component, OnInit } from '@angular/core';

import { RecipeAPI } from '@fridge-to-plate/app/recipe/data-access';
import { IRecipe } from '@fridge-to-plate/app/recipe/utils';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'recipe-page',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class RecipePage implements OnInit {
  recipe !: IRecipe | undefined;
  errorMessage: string | undefined;

  constructor(
    private location: Location,
    private recipeService: RecipeAPI,
    private route: ActivatedRoute
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

    this.recipeService.getRecipeById(id).subscribe(
      (response: IRecipe) => {
        this.recipe = response;
      },
     
      (error: Error) => {
        this.errorMessage = 'Error retrieving recipe data.';
        console.error(error)
        this.recipe = undefined;
      }
    );
  }
}

