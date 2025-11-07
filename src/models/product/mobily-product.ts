import { MobilyProductType } from '../../enums/mobily-product-type';
import { MobilyProductStatus } from '../../enums/mobily-product-status';
import { MobilyOneTimeProduct } from './mobily-one-time-product';
import { MobilySubscriptionProduct } from './mobily-subscription-product';
import { objectTransformer } from '../../utils/object-transformer';

export class MobilyProduct {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  identifier: string;
  referenceName: string;
  externalRef: string | null;

  android_sku: string | null;
  android_basePlanId: string | null;
  ios_sku: string | null;

  type: MobilyProductType;
  extras: any | null;

  priceMillis: number;
  currencyCode: string;
  priceFormatted: string;
  status: MobilyProductStatus;

  name: string;
  description: string;

  oneTime: MobilyOneTimeProduct | null;
  subscription: MobilySubscriptionProduct | null;

  static parseFromAPI(obj: MobilyProduct) {
    return objectTransformer(obj, {
      dates: ['createdAt', 'updatedAt'],
      nullIfUndefined: [
        'externalRef',
        'android_sku',
        'android_basePlanId',
        'ios_sku',
        'extras',
        'oneTime',
        'subscription',
      ],
      mapping: {
        oneTime: MobilyOneTimeProduct.parseFromAPI,
        subscription: MobilySubscriptionProduct.parseFromAPI,
      },
    });
  }
}
