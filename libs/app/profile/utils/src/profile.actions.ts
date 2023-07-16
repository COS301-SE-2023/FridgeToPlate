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

export class SortSavedByDifficulty {
    static readonly type = '[Profile] SortSavedByDifficulty';
}

export class SortSavedByNameAsc {
    static readonly type = '[Profile] SortSavedByNameAsc';
}

export class SortSavedByNameDesc {
    static readonly type = '[Profile] SortSavedByNameDesc';
}

export class SortCreatedByDifficulty {
    static readonly type = '[Profile] SortCreatedByDifficulty';
}

export class SortCreatedByNameAsc {
    static readonly type = '[Profile] SortCreatedByNameAsc';
}

export class SortCreatedByNameDesc {
    static readonly type = '[Profile] SortCreatedByNameDesc';
}