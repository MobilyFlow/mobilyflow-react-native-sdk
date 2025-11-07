import { objectTransformer } from '../utils/object-transformer';
import { MobilyCustomer, MobilyPlatform, MobilyProduct, MobilySubscriptionOffer } from 'mobilyflow-react-native-sdk';
import { MobilyEventType } from '../enums/mobily-event-type';
import { MobilyTransaction } from './mobily-transaction';
import { MobilySubscription } from './entitlement/mobily-subscription';
import { MobilyItem } from './entitlement/mobily-item';

export class MobilyEvent {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  transactionId: string | null;
  subscriptionId: string | null;
  itemId: string | null;
  customerId: string | null;
  type: MobilyEventType;
  extras: any | null;
  platform: MobilyPlatform;
  isSandbox: boolean;
  Customer: MobilyCustomer | null;
  Product: MobilyProduct | null;
  ProductOffer: MobilySubscriptionOffer | null;
  Transaction: MobilyTransaction | null;
  Subscription: MobilySubscription | null;
  Item: MobilyItem | null;

  static parseFromAPI(obj: MobilyCustomer) {
    return objectTransformer(obj, {
      nullIfUndefined: [
        'transactionId',
        'subscriptionId',
        'itemId',
        'customerId',
        'extras',
        'Customer',
        'Product',
        'ProductOffer',
        'Subscription',
        'Item',
      ],
      dates: ['createdAt', 'updatedAt'],
      mapping: {
        Customer: MobilyCustomer.parseFromAPI,
        Product: MobilyProduct.parseFromAPI,
        ProductOffer: MobilySubscriptionOffer.parseFromAPI,
        Transaction: MobilyTransaction.parseFromAPI,
        Subscription: MobilySubscription.parseFromAPI,
        Item: MobilyItem.parseFromAPI,
      },
    });
  }
}
