import { ProductType } from '../enums/product-type';
import { MobilyProduct } from './mobily-product';
import { Platform } from '../enums/platform';
import { objectTransformer } from '../utils/object-transformer';
import { MobilySubscriptionOffer } from './mobily-subscription-offer';

export class ItemEntitlement {
  quantity: number;
}

export class SubscriptionEntitlement {
  startDate: Date;
  endDate: Date;
  autoRenewEnable: boolean;
  isInGracePeriod: boolean;
  isInBillingIssue: boolean;
  isExpiredOrRevoked: boolean;
  isPaused: boolean;
  hasPauseScheduled: boolean;
  resumeDate: Date | null;
  offerExpiryDate: Date | null;
  offerRemainingCycle: number;
  currency: string;
  lastPriceMillis: number;
  regularPriceMillis: number;
  renewPriceMillis: number;
  platform: Platform;
  isManagedByThisStoreAccount: boolean;
  offer: MobilySubscriptionOffer;
  renewProduct: MobilyProduct;
  renewProductOffer: MobilySubscriptionOffer;

  static parseFromAPI(obj: SubscriptionEntitlement) {
    return objectTransformer(obj, {
      dates: ['startDate', 'endDate', 'resumeDate', 'offerExpiryDate'],
      mapping: {
        offer: MobilySubscriptionOffer.parseFromAPI,
        renewProduct: MobilyProduct.parseFromAPI,
        renewProductOffer: MobilySubscriptionOffer.parseFromAPI,
      },
    });
  }
}

export class MobilyCustomerEntitlement {
  type: ProductType;
  product: MobilyProduct;
  platformOriginalTransactionId: string;
  item?: ItemEntitlement;
  subscription?: SubscriptionEntitlement;
  customerId?: string;

  static parseFromAPI(obj: MobilyCustomerEntitlement) {
    return objectTransformer(obj, {
      mapping: {
        product: MobilyProduct.parseFromAPI,
        subscription: SubscriptionEntitlement.parseFromAPI,
      },
    });
  }
}
