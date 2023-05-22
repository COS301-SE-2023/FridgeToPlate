export interface IngredientItem {
  id: number;
  name: string;
  quantity: number;
  metadata ?: {
    amountPerUnit?: number;
    unit?: string;
  }
}

export const ingredientsArray: IngredientItem[] = [
  {
    id: 0,
    name: 'Milk',
    quantity: 1,
    metadata: {
      amountPerUnit: 1000,
      unit: 'ml'
    }
  },
  {
    id: 1,
    name: 'Onions',
    quantity: 5,
    metadata: {
      amountPerUnit: 100,
      unit: 'g'
    }
  },
  {
    id: 2,
    name: 'Beef',
    quantity: 2,
    metadata: {
      amountPerUnit: 1000,
      unit: 'g'
    }
  },
  {
    id: 3,
    name: 'Pasta',
    quantity: 3,
    metadata: {
      amountPerUnit: 500,
      unit: 'g'
    }
  },
  {
    id: 4,
    name: 'Tomatoes',
    quantity: 4,
    metadata: {
      amountPerUnit: 100,
      unit: 'g'
    }
  },
  {
    id: 5,
    name: 'Chicken',
    quantity: 5,
    metadata: {
      amountPerUnit: 1000,
      unit: 'g'
    }
  }

]
