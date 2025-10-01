import type { ProductStatus } from '../enums/product-status';
import { objectTransformer } from '../utils/object-transformer';

export class MobilyOneTimeProduct {
  priceMillis: number;
  currencyCode: string;
  priceFormatted: string;
  isConsumable: boolean;
  isNonRenewableSub: boolean;
  isMultiQuantity: boolean;
  status: ProductStatus;

  static parseFromAPI(obj: MobilyOneTimeProduct) {
    return objectTransformer(obj, {});
  }
}
