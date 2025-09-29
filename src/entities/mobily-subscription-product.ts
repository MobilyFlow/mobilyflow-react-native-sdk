import type { ProductStatus } from '../enums/product-status';
import { MobilySubscriptionOffer } from './mobily-subscription-offer';
import { MobilySubscriptionGroup } from './mobily-subscription-group';
import { objectTransformer } from '../utils/object-transformer';

export class MobilySubscriptionProduct {
  baseOffer: MobilySubscriptionOffer;
  freeTrial: MobilySubscriptionOffer;
  promotionalOffers: MobilySubscriptionOffer[];
  status: ProductStatus;

  groupLevel: number;
  subscriptionGroupId: string;
  subscriptionGroup: MobilySubscriptionGroup;

  static parseFromAPI(obj: MobilySubscriptionProduct) {
    return objectTransformer(obj, {
      mapping: {
        baseOffer: MobilySubscriptionOffer.parseFromAPI,
        freeTrial: MobilySubscriptionOffer.parseFromAPI,
        promotionalOffers: MobilySubscriptionOffer.parseFromAPI,
        subscriptionGroup: MobilySubscriptionGroup.parseFromAPI,
      },
    });
  }
}
