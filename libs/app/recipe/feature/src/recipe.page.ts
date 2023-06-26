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

  constructor(
    private location: Location,
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  goBack() {
    this.location.back();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const recipeId = params.get('id');
      if (recipeId) {
        this.recipeService.getRecipeById(recipeId).subscribe(
          (response: IRecipe) => {
            console.log(response)
            this.recipe = response;
            console.log("Here", this.recipe); // Access the response here
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }
}

// import { Component, OnInit} from '@angular/core';
// import { recipeList } from "@fridge-to-plate/app/recipe/data-access";
// import { IRecipe} from "@fridge-to-plate/app/recipe/utils";
// import { NavigationBar } from "@fridge-to-plate/app/navigation/feature";
// import { Location } from '@angular/common';
// import { RecipeService } from '@fridge-to-plate/app/recipe/data-access';

// @Component({
//   selector: 'recipe-page',
//   templateUrl: './recipe.page.html',
//   styleUrls: ['./recipe.page.scss']
// })
// export class RecipePage implements OnInit {
//   recipe: IRecipe | undefined;

//   constructor(private location: Location, private recipeService: RecipeService) {}

//   goBack() {
//     this.location.back();
//   }

//   // recipe: IRecipe = recipeList[0];
//   ngOnInit(): void {
//     const recipeId = '123'; // Replace with a valid recipe ID
//     this.recipeService.getRecipeById(recipeId).subscribe(
//       (response: IRecipe) => {
//         this.recipe = response;
//         console.log(this.recipe); // Access the response here
//       },
//       (error) => {
//         console.error(error);
//       }
//     );
//   }


// }
