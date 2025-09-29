import type { ProductStatus } from '../enums/product-status';
import type { PeriodUnit } from '../enums/period-unit';
import { objectTransformer } from '../utils/object-transformer';

export class MobilySubscriptionOffer {
  id: string;
  identifier: string;
  externalRef: string;
  referenceName: string;
  name: string;
  price: number;
  currencyCode: string;
  priceFormatted: string;
  type: string;
  periodCount: number;
  periodUnit: PeriodUnit;
  countBillingCycle: number;
  ios_offerId: string;
  extras: any;
  status: ProductStatus;

  static parseFromAPI(obj: MobilySubscriptionOffer) {
    return objectTransformer(obj, {});
  }
}
