import { IQuantityIngredient } from '@fridge-to-plate/app/ingredient/utils';

export interface IngredientItem {
  ingredientId: number;
  name: string;
  quantity: number;
  metadata?: {
    amountPerUnit?: number;
    unit?: string;
    tags?: string[];
  };
}

export const ingredientsArray: IQuantityIngredient[] = [
  {
    ingredientId: '0',
    name: 'Tomato',
    quantity: 2,
    scale: 'kg',
  },
  {
    ingredientId: '1',
    name: 'Onion',
    quantity: 1,
    scale: 'kg',
  },
  {
    ingredientId: '2',
    name: 'Rice',
    quantity: 3,
    scale: 'kg',
  },
  {
    ingredientId: '3',
    name: 'Chicken',
    quantity: 2,
    scale: 'kg',
  },
  {
    ingredientId: '4',
    name: 'Rump Steak',
    quantity: 3,
    scale: 'kg',
  },
  {
    ingredientId: '5',
    name: 'Rice',
    quantity: 3,
    scale: 'kg',
  },
  {
    ingredientId: '6',
    name: 'Flour',
    quantity: 2,
    scale: 'kg',
  },
  {
    ingredientId: '7',
    name: 'Egg',
    quantity: 500,
    scale: 'g',
  },
  {
    ingredientId: '8',
    name: 'Peppers',
    quantity: 2,
    scale: 'kg',
  },
  {
    ingredientId: '9',
    name: 'Sunflower Oil',
    quantity: 2,
    scale: 'l',
  },
  {
    ingredientId: '10',
    name: 'Milk',
    quantity: 4,
    scale: 'l',
  },
  {
    ingredientId: '11',
    name: 'Soy Sauce',
    quantity: 500,
    scale: 'ml',
  },
  {
    ingredientId: '12',
    name: 'Beef Stock',
    quantity: 200,
    scale: 'ml',
  },
  {
    ingredientId: '13',
    name: 'Pasta',
    quantity: 2,
    scale: 'kg',
  },
  {
    ingredientId: '14',
    name: 'Salt',
    quantity: 200,
    scale: 'g',
  },
  {
    ingredientId: '15',
    name: 'Salmon',
    quantity: 1,
    scale: 'kg',
  },
];
