import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';
import { IAPIProduct } from '../interfaces/index';

export function convertProductFromApi(product: IAPIProduct) {
  const convertedIngredient: IIngredient = {
    name: '',
    amount: 0,
    unit: '',
  };

  if (product) {
    convertedIngredient.name = product.name;
  }

  return convertedIngredient;
}
