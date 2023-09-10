import { Injectable } from "@angular/core";
import { IRecipe } from "@fridge-to-plate/app/recipe/utils";

@Injectable()
export class ConversionService {
    convertRecipe(recipe: IRecipe, type: string): IRecipe {
        recipe.ingredients.forEach(element => {
            
        });

        return recipe;
    }
}