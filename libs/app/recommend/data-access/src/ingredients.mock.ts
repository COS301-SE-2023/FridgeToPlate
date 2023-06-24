import { QuantityIngredient } from '@fridge-to-plate/app/ingredient/utils';

export interface IngredientItem {
  id: number;
  name: string;
  quantity: number;
  metadata?: {
    amountPerUnit?: number;
    unit?: string;
    tags?: string[];
  };
}

export const ingredientsArray: QuantityIngredient[] = [
  {
    id: '0',
    name: 'Tomato',
    quantity: 2,
    scale: 'kg',
  },
  {
    id: '1',
    name: 'Onion',
    quantity: 1,
    scale: 'kg',
  },
  {
    id: '2',
    name: 'Rice',
    quantity: 3,
    scale: 'kg',
  },
  {
    id: '3',
    name: 'Chicken',
    quantity: 2,
    scale: 'kg',
  },
  {
    id: '4',
    name: 'Rump Steak',
    quantity: 3,
    scale: 'kg',
  },
  {
    id: '5',
    name: 'Rice',
    quantity: 3,
    scale: 'kg',
  },
  {
    id: '6',
    name: 'Flour',
    quantity: 2,
    scale: 'kg',
  },
  {
    id: '7',
    name: 'Egg',
    quantity: 500,
    scale: 'g',
  },
  {
    id: '8',
    name: 'Peppers',
    quantity: 2,
    scale: 'kg',
  },
  {
    id: '9',
    name: 'Sunflower Oil',
    quantity: 2,
    scale: 'l',
  },
  {
    id: '10',
    name: 'Milk',
    quantity: 4,
    scale: 'l',
  },
  {
    id: '11',
    name: 'Soy Sauce',
    quantity: 500,
    scale: 'ml',
  },
  {
    id: '12',
    name: 'Beef Stock',
    quantity: 200,
    scale: 'ml',
  },
  {
    id: '13',
    name: 'Pasta',
    quantity: 2,
    scale: 'kg',
  },
  {
    id: '14',
    name: 'Salt',
    quantity: 200,
    scale: 'g',
  },
  {
    id: '15',
    name: 'Salmon',
    quantity: 1,
    scale: 'kg',
  },
];
