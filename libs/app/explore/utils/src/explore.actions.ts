import { IProfile } from "@fridge-to-plate/app/profile/utils";
import { IRecipe } from "@fridge-to-plate/app/recipe/utils";


export class RetrieveProfile {
    static readonly type = '[Profile] RetrieveProfile';
    constructor(public readonly username: string) {}
}

export class RetrieveRecipe {
    static readonly type = '[Recipe] RetrieveRecipe';
    constructor(public readonly recipename: string) {}
}