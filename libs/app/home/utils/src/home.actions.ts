export class RetrieveFeaturedRecipes {
    static readonly type = '[Home] RetrieveFeaturedRecipes';
    constructor(public readonly meal: string) {}
}

export class ClearFeaturedRecipes {
  static readonly type = '[Home] ClearFeaturedRecipes';
  constructor() {}
}
