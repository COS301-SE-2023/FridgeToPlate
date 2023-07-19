import { IProfile } from "@fridge-to-plate/app/profile/utils";
import { IIngredient } from "@fridge-to-plate/app/ingredient/utils";
import { IRecipe } from "@fridge-to-plate/app/recipe/utils";



export class RetrieveProfile {
    static readonly type = '[Profile] RetrieveProfile';
    constructor(public readonly profiles: IProfile) {}
}

export class RetrieveIngredient {
    static readonly type = '[Ingredient] RetrieveIngredient';
    constructor(public readonly ingredients: IIngredient) {}
}

export class RetrieveRecipe {
    static readonly type = '[Profile] RetrieveRecipe';
    constructor(public readonly recipes: IRecipe) {}
}