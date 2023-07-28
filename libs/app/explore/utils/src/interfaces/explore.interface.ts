import { IRecipeDesc } from '@fridge-to-plate/app/recipe/utils';

export interface IExplore {
    exploreType: string;
    name: string;
    tags: string[];
    difficulty: 'Any' | 'Easy' | 'Medium' | 'Hard';
}
