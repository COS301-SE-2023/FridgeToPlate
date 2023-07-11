import { IIngredient } from "@fridge-to-plate/app/ingredient/utils";
import { IProfile } from "./interfaces";

export class UpdateProfile {
    static readonly type = '[Profile] UpdateProfile';
    constructor(public readonly profile: IProfile) {}
}

export class RemoveIngredient {
    static readonly type = '[Profile] RemoveIngredient';
    constructor(public readonly ingredient: IIngredient) {}
}

export class AddIngredient {
    static readonly type = '[Profile] AddIngredient';
    constructor(public readonly ingredient: IIngredient) {}
}