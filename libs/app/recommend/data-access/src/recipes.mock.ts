import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';
import { IRecipe } from '@fridge-to-plate/app/recipe/utils';

export const recipeArray: IRecipe[] = [
  {
    id: '0',
    name: 'Beef Stew',
    recipeImage: 'https://source.unsplash.com/800x800/?food',
    ingredients: [],
    difficulty: 'medium',
    steps: [
      {
        instructionHeading: 'Prepare vegatables',
        instructionBody: 'Take vegetables and wash thoroughly',
        stepDuration: 2,
      },
    ],
    meta: {
      prepTime: 60,
      numberOfServings: 4,
      tags: ['Beef', 'Protien'],
    },
  },
  {
    id: '1',
    name: 'Omelette',
    recipeImage: 'https://source.unsplash.com/800x800/?food',
    ingredients: [],
    difficulty: 'easy',
    steps: [
      {
        instructionHeading: 'Beat eggs',
        instructionBody: 'Crack eggs into container and beat until mixed',
        stepDuration: 2,
      },
    ],
    meta: {
      prepTime: 10,
      numberOfServings: 1,
      tags: ['Egg', 'Protien'],
    },
  },
  {
    id: '2',
    name: 'Greek Salad',
    recipeImage: 'https://source.unsplash.com/800x800/?food',
    ingredients: [],
    difficulty: 'easy',
    steps: [
      {
        instructionHeading: 'Prepare vegatables',
        instructionBody: 'Take vegetables and wash thoroughly',
        stepDuration: 2,
      },
    ],
    meta: {
      prepTime: 10,
      numberOfServings: 4,
      tags: ['Vegetarian', 'Salad', 'Leafy'],
    },
  },
  {
    id: '3',
    name: 'Vegan Pizza',
    recipeImage: 'https://source.unsplash.com/800x800/?food',
    ingredients: [],
    difficulty: 'hard',
    steps: [
      {
        instructionHeading: 'Prepare vegatables',
        instructionBody: 'Take vegetables and wash thoroughly',
        stepDuration: 2,
      },
    ],
    meta: {
      prepTime: 60,
      numberOfServings: 4,
      tags: ['Vegetarian', 'Vegan'],
    },
  },
  {
    id: '4',
    name: 'Chow Mein',
    recipeImage: 'https://source.unsplash.com/800x800/?food',
    ingredients: [],
    difficulty: 'hard',
    steps: [
      {
        instructionHeading: 'Prepare vegatables',
        instructionBody: 'Take vegetables and wash thoroughly',
        stepDuration: 2,
      },
    ],
    meta: {
      prepTime: 60,
      numberOfServings: 4,
      tags: ['Asian', 'Protien'],
    },
  },
  {
    id: '5',
    name: 'Shrimp Pasta',
    recipeImage: 'https://source.unsplash.com/800x800/?food',
    ingredients: [],
    difficulty: 'hard',
    steps: [
      {
        instructionHeading: 'Prepare vegatables',
        instructionBody: 'Take vegetables and wash thoroughly',
        stepDuration: 2,
      },
    ],
    meta: {
      prepTime: 60,
      numberOfServings: 4,
      tags: ['Pasta', 'Seafood'],
    },
  },
  {
    id: '6',
    name: 'Cheeseburger',
    recipeImage: 'https://source.unsplash.com/800x800/?food',
    ingredients: [],
    difficulty: 'medium',
    steps: [
      {
        instructionHeading: 'Prepare vegatables',
        instructionBody: 'Take vegetables and wash thoroughly',
        stepDuration: 2,
      },
    ],
    meta: {
      prepTime: 60,
      numberOfServings: 4,
      tags: ['Carbs', 'Beef'],
    },
  },
  {
    id: '7',
    name: 'Tacos',
    recipeImage: 'https://source.unsplash.com/800x800/?food',
    ingredients: [],
    difficulty: 'hard',
    steps: [
      {
        instructionHeading: 'Prepare vegatables',
        instructionBody: 'Take vegetables and wash thoroughly',
        stepDuration: 2,
      },
    ],
    meta: {
      prepTime: 60,
      numberOfServings: 4,
      tags: ['Spanish', 'Snack'],
    },
  },
];
