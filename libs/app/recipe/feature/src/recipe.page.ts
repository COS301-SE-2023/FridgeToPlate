import { Component, OnInit } from '@angular/core';

import { RecipeService } from '@fridge-to-plate/app/recipe/data-access';
import { IRecipe } from '@fridge-to-plate/app/recipe/utils';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'recipe-page',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss'],
})
export class RecipePage implements OnInit {
  recipe!: IRecipe;
  errorMessage: string | undefined;

  constructor(
    private location: Location,
    private recipeService: RecipeService,
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
      return;
    }

    this.recipeService.getRecipeById(id).subscribe(
      (response: IRecipe) => {
        this.recipe = response;
      },
      error => {
        this.errorMessage = 'Error retrieving recipe data.';
      }
    );
  }
}

