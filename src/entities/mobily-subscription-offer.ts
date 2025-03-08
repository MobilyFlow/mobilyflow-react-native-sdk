import type { ProductStatus } from '../enums/product-status';
import type { PeriodUnit } from '../enums/period-unit';

export interface MobilySubscriptionOffer {
  id: string;
  name: string;
  price: number;
  currencyCode: string;
  priceFormatted: string;
  isFreeTrial: boolean;
  periodCount: number;
  periodUnit: PeriodUnit;
  ios_offerId: string;
  extras: any;
  status: ProductStatus;
}
