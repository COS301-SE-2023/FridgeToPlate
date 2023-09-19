import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';
import { IAPIProduct } from '../interfaces/index';

export function convertProductFromApi(product: IAPIProduct) {
  const convertedIngredient: IIngredient = {
    name: '',
    amount: 0,
    unit: '',
  };

  if (product) {
    const values = product.name.split(" ");

    if (/^\d+$/.test(values[values.length - 1][0])) {
      convertedIngredient.name = values[values.length - 2];
      convertedIngredient.amount = parseInt(values[values.length - 1]);
      convertedIngredient.unit = values[values.length - 1].replace(convertedIngredient.amount.toString(), '');
    } else {
      convertedIngredient.name = values[values.length - 1];
    }

  }

  return convertedIngredient;
}
