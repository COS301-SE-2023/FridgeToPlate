import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RecipeDetailApiService} from "../../data-access/src/lib/recipe-detail-api.service";
import {Observable, switchMap} from "rxjs";
import {IRecipe} from "@fridge-to-plate/app/recipe/utils";
import {fromFetch} from "rxjs/internal/observable/dom/fetch";

@Component({
  selector: 'recipe-page',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss']
})
export class RecipePage implements OnInit {

  recipeId: Number | undefined;
  recipe: Observable<IRecipe> | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private recipeApiService: RecipeDetailApiService
  ) {}
  ngOnInit() {
    this.recipeId = Number.parseInt(this.route.snapshot.paramMap.get('id') ?? "");

    if(Number.isNaN(this.recipeId)){
      this.router.navigate(['/recipe/'])
    }

    else {
      //Use API
      this.recipe = this.recipeApiService
        .getRecipeDetails(this.recipeId.valueOf())
    }
  }
}
