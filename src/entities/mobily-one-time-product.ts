import type { ProductStatus } from '../enums/product-status';

export class MobilyOneTimeProduct {
  price: number;
  currencyCode: string;
  priceFormatted: string;
  isConsumable: boolean;
  isNonRenewableSub: boolean;
  isMultiQuantity: boolean;
  status: ProductStatus;
}
