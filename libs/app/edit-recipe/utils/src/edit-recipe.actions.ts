import { IRecipe } from "@fridge-to-plate/app/recipe/utils";

export class LoadRecipe {
    static readonly type = '[EditRecipe] Load Recipe';
    constructor(public readonly recipe: IRecipe) {}
}