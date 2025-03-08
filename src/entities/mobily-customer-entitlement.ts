import type { ProductType } from '../enums/product-type';
import type { MobilyProduct } from './mobily-product';
import type { Platform } from '../enums/platform';

export interface ItemEntitlement {
  quantity: number;
}
export interface SubscriptionEntitlement {
  startDate: Date;
  expirationDate: Date;
  autoRenewEnable: boolean;
  platform: Platform;
  isManagedByThisStoreAccount: boolean;
}

export interface MobilyCustomerEntitlement {
  type: ProductType;
  product: MobilyProduct;
  platformOriginalTransactionId: string;
  item?: ItemEntitlement;
  subscription?: SubscriptionEntitlement;
}
