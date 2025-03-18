import { ProductType } from '../enums/product-type';
import { MobilyProduct } from './mobily-product';
import { Platform } from '../enums/platform';
import { objectTransformer } from '../utils/object-transformer';

export class ItemEntitlement {
  quantity: number;
}

export class SubscriptionEntitlement {
  startDate: Date;
  expirationDate: Date;
  autoRenewEnable: boolean;
  platform: Platform;
  isManagedByThisStoreAccount: boolean;

  static parseFromAPI(obj: SubscriptionEntitlement) {
    return objectTransformer(obj, { dates: ['startDate', 'expirationDate'] });
  }
}

export class MobilyCustomerEntitlement {
  type: ProductType;
  product: MobilyProduct;
  platformOriginalTransactionId: string;
  item?: ItemEntitlement;
  subscription?: SubscriptionEntitlement;

  static parseFromAPI(obj: MobilyCustomerEntitlement) {
    return objectTransformer(obj, {
      mapping: {
        product: MobilyProduct.parseFromAPI,
        subscription: SubscriptionEntitlement.parseFromAPI,
      },
    });
  }
}
