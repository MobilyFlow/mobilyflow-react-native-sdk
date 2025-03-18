import type { ProductStatus } from '../enums/product-status';
import { MobilySubscriptionOffer } from './mobily-subscription-offer';
import { MobilySubscriptionGroup } from './mobily-subscription-group';

export class MobilySubscriptionProduct {
  baseOffer: MobilySubscriptionOffer;
  freeTrial: MobilySubscriptionOffer;
  promotionalOffers: MobilySubscriptionOffer[];
  status: ProductStatus;

  groupLevel: number;
  subscriptionGroupId: string;
  subscriptionGroup: MobilySubscriptionGroup;
}
