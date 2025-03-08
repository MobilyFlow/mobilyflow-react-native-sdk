import type { ProductStatus } from '../enums/product-status';
import type { MobilySubscriptionOffer } from './mobily-subscription-offer';
import type { MobilySubscriptionGroup } from './mobily-subscription-group';

export interface MobilySubscriptionProduct {
  baseOffer: MobilySubscriptionOffer;
  freeTrial: MobilySubscriptionOffer;
  promotionalOffers: MobilySubscriptionOffer[];
  status: ProductStatus;

  groupLevel: number;
  subscriptionGroupId: string;
  subscriptionGroup: MobilySubscriptionGroup;
}
