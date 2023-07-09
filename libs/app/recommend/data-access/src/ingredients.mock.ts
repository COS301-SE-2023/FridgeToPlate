import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';

export interface IngredientItem {
  ingredientId: number;
  name: string;
  amount: number;
  metadata?: {
    amountPerUnit?: number;
    unit?: string;
    tags?: string[];
  };
}

export const ingredientsArray: IIngredient[] = [
  {
    ingredientId: '0',
    name: 'Tomato',
    amount: 2,
    unit: 'kg',
  },
  {
    ingredientId: '1',
    name: 'Onion',
    amount: 1,
    unit: 'kg',
  },
  {
    ingredientId: '2',
    name: 'Rice',
    amount: 3,
    unit: 'kg',
  },
  {
    ingredientId: '3',
    name: 'Chicken',
    amount: 2,
    unit: 'kg',
  },
  {
    ingredientId: '4',
    name: 'Rump Steak',
    amount: 3,
    unit: 'kg',
  },
  {
    ingredientId: '5',
    name: 'Rice',
    amount: 3,
    unit: 'kg',
  },
  {
    ingredientId: '6',
    name: 'Flour',
    amount: 2,
    unit: 'kg',
  },
  {
    ingredientId: '7',
    name: 'Egg',
    amount: 500,
    unit: 'g',
  },
  {
    ingredientId: '8',
    name: 'Peppers',
    amount: 2,
    unit: 'kg',
  },
  {
    ingredientId: '9',
    name: 'Sunflower Oil',
    amount: 2,
    unit: 'l',
  },
  {
    ingredientId: '10',
    name: 'Milk',
    amount: 4,
    unit: 'l',
  },
  {
    ingredientId: '11',
    name: 'Soy Sauce',
    amount: 500,
    unit: 'ml',
  },
  {
    ingredientId: '12',
    name: 'Beef Stock',
    amount: 200,
    unit: 'ml',
  },
  {
    ingredientId: '13',
    name: 'Pasta',
    amount: 2,
    unit: 'kg',
  },
  {
    ingredientId: '14',
    name: 'Salt',
    amount: 200,
    unit: 'g',
  },
  {
    ingredientId: '15',
    name: 'Salmon',
    amount: 1,
    unit: 'kg',
  },
];
