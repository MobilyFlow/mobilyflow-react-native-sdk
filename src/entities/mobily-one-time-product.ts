import type { ProductStatus } from '../enums/product-status';

export interface MobilyOneTimeProduct {
  price: number;
  currencyCode: string;
  priceFormatted: string;
  isConsumable: boolean;
  isNonRenewableSub: boolean;
  isMultiQuantity: boolean;
  status: ProductStatus;
}
