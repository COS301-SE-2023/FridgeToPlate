import { IRecipeDesc } from "@fridge-to-plate/app/recipe/utils";
import { IProfile } from "./interfaces";

export class UpdateProfile {
    static readonly type = '[Profile] UpdateProfile';
    constructor(public readonly profile: IProfile) {}
}

export class CreateNewProfile {
    static readonly type = '[Profile] CreateNewProfile';
    constructor(public readonly profile: IProfile) {}
}

export class RetrieveProfile {
    static readonly type = '[Profile] RetrieveProfile';
    constructor(public readonly username: string) {}
}

export class SaveRecipe {
    static readonly type = '[Profile] SaveRecipe';
    constructor(public readonly recipe: IRecipeDesc) {}
}

export class RemoveRecipe {
    static readonly type = '[Profile] RemoveRecipe';
    constructor(public readonly recipe: IRecipeDesc) {}
}