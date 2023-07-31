
export class LoadRecipe {
    static readonly type = '[EditRecipe] Load Recipe';
    constructor(public readonly recipeId: string) {}
}