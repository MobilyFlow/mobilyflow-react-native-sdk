import { MobilyPlatform, MobilyProduct, MobilySubscriptionOffer } from 'mobilyflow-react-native-sdk';
import { objectTransformer } from '../../utils/object-transformer';

export class MobilySubscription {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  productId: string;
  productOfferId: string | null;
  startDate: Date;
  endDate: Date;
  platform: MobilyPlatform;
  renewProductId: string | null;
  renewProductOfferId: string | null;
  lastPriceMillis: number;
  regularPriceMillis: number;
  renewPriceMillis: number;
  currency: string;
  offerExpiryDate: Date | null;
  offerRemainingCycle: number;
  autoRenewEnable: boolean;
  isInGracePeriod: boolean;
  isInBillingIssue: boolean;
  hasPauseScheduled: boolean;
  isPaused: boolean;
  resumeDate: Date | null;
  isExpiredOrRevoked: boolean;
  isManagedByThisStoreAccount: boolean;
  lastPlatformTxOriginalId: string | null;
  Product: MobilyProduct | null;
  ProductOffer: MobilySubscriptionOffer | null;
  RenewProduct: MobilyProduct | null;
  RenewProductOffer: MobilySubscriptionOffer | null;

  static parseFromAPI(obj: MobilySubscription) {
    return objectTransformer(obj, {
      dates: ['createdAt', 'updatedAt', 'startDate', 'endDate', 'offerExpiryDate', 'resumeDate'],
      nullIfUndefined: [
        'productOfferId',
        'renewProductId',
        'renewProductOfferId',
        'offerExpiryDate',
        'resumeDate',
        'lastPlatformTxOriginalId',
        'Product',
        'ProductOffer',
        'RenewProduct',
        'RenewProductOffer',
      ],
      mapping: {
        Product: MobilyProduct.parseFromAPI,
        ProductOffer: MobilySubscriptionOffer.parseFromAPI,
        RenewProduct: MobilyProduct.parseFromAPI,
        RenewProductOffer: MobilySubscriptionOffer.parseFromAPI,
      },
    });
  }
}
