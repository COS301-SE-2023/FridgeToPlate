import { IRecipe } from "./interfaces";

export class UpdateRecipe {
    static readonly type = "[EditRecipe] UpdateRecipe";
    constructor(public readonly recipe: IRecipe) {}
}

export class DeleteRecipe {
    static readonly type = "[EditRecipe] DeleteRecipe";
    constructor(public readonly recipeId: string) {}
}
