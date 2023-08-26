export interface IAPIProduct {
  name: string;
  description: string;
  imageUrl: string;
  brand: string;
  category: string;
  specs: string[][];
}

export interface IProductInformationAPIResponse {
  code: string;
  codeType: string;
  product: IAPIProduct;
  barcodeUrl: string;
}
