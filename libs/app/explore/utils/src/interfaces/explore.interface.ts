import { IRecipeDesc } from '@fridge-to-plate/app/recipe/utils';

export interface IExplore {
    type: string;
    search: string;
    tags: string[];
    difficulty: 'Any' | 'Easy' | 'Medium' | 'Hard';
}
