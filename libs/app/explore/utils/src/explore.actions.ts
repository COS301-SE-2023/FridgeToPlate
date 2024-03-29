import { IExplore } from "./interfaces";


export class RetrieveProfile {
    static readonly type = '[Profile] RetrieveProfile';
    constructor(public readonly username: string) {}
}

export class RetrieveRecipe {
    static readonly type = '[Recipe] RetrieveRecipe';
    constructor(public readonly recipename: string) {}
}

export class CategorySearch {
    static readonly type = '[Explore] CategorySearch';
    constructor(public readonly search: IExplore) {}
}