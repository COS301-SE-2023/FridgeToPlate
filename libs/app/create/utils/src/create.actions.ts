import { IRecipe } from "@fridge-to-plate/app/recipe/utils";

export class CreateRecipe {
    static readonly type = "[Create] CreateRecipe";
    constructor(public readonly recipe: IRecipe) {}
}