import type { MobilyProductStatus } from '../../enums/mobily-product-status';
import type { PeriodUnit } from '../../enums/period-unit';
import { objectTransformer } from '../../utils/object-transformer';
import { MobilyProductOfferType } from '../../enums/mobily-product-offer-type';
import { MobilyProductOfferPricingMode } from '../../enums/mobily-product-offer-pricing-mode';

export class MobilySubscriptionOffer {
  id: string;
  identifier: string;
  externalRef: string | null;
  referenceName: string;
  priceMillis: number;
  currencyCode: string;
  priceFormatted: string;
  type: MobilyProductOfferType;
  pricingMode: MobilyProductOfferPricingMode;
  periodCount: number;
  periodUnit: PeriodUnit;
  countBillingCycle: number;
  android_offerId: string;
  ios_offerId: string | null;
  extras: any | null;
  status: MobilyProductStatus;
  name: string;

  static parseFromAPI(obj: MobilySubscriptionOffer) {
    return objectTransformer(obj, {
      nullIfUndefined: ['externalRef', 'ios_offerId', 'extras'],
    });
  }
}
