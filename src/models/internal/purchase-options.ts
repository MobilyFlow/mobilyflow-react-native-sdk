import type { MobilySubscriptionOffer } from '../product/mobily-subscription-offer';

export type PurchaseOptions = {
  offer?: MobilySubscriptionOffer;
  quantity?: number;
};
