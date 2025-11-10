import { MobilyProductType } from '../../enums/mobily-product-type';
import { MobilyProduct } from '../product/mobily-product';
import { objectTransformer } from '../../utils/object-transformer';
import { MobilyItem } from './mobily-item';
import { MobilySubscription } from './mobily-subscription';

export class MobilyCustomerEntitlement {
  type: MobilyProductType;
  Product: MobilyProduct;
  Item: MobilyItem | null;
  Subscription: MobilySubscription | null;
  customerId: string;

  static parseFromAPI(obj: MobilyCustomerEntitlement) {
    return objectTransformer(obj, {
      nullIfUndefined: ['Item', 'Subscription'],
      mapping: {
        Product: MobilyProduct.parseFromAPI,
        Item: MobilyItem.parseFromAPI,
        Subscription: MobilySubscription.parseFromAPI,
      },
    });
  }
}
