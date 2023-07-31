export class RetrieveFeaturedRecipes {
    static readonly type = '[Home] RetrieveFeaturedRecipes';
    constructor(public readonly meal: string) {}
}