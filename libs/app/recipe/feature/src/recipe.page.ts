import {Component, OnInit} from '@angular/core';
import { recipeList } from "@fridge-to-plate/app/recipe/data-access";
import { IRecipe} from "@fridge-to-plate/app/recipe/utils";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'recipe-page',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss']
})
export class RecipePage implements OnInit {
  recipe: IRecipe = recipeList[0];
  recipeId: Number | undefined;
  constructor(private route: ActivatedRoute, private router: Router) {
  }
  ngOnInit() {
    this.recipeId = Number.parseInt(this.route.snapshot.paramMap.get('id') ?? "");

    if(Number.isNaN(this.recipeId)){
      this.router.navigate(['/recipe/'])
    }

    else {
      //Use API
    }
  }
}
