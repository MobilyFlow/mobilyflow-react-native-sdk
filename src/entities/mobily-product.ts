import { ProductType } from '../enums/product-type';
import type { ProductStatus } from '../enums/product-status';
import type { MobilyOneTimeProduct } from './mobily-one-time-product';
import type { MobilySubscriptionProduct } from './mobily-subscription-product';
import { objectTransformer } from '../utils/object-transformer';

export class MobilyProduct {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  identifier: string;
  appId: string;

  name: string;
  description: string;
  ios_sku: string;
  android_sku: string;

  type: ProductType;
  extras: any;

  status: ProductStatus;

  oneTimeProduct?: MobilyOneTimeProduct;
  subscriptionProduct?: MobilySubscriptionProduct;

  static parseFromAPI(obj: MobilyProduct) {
    return objectTransformer(obj, {
      dates: ['createdAt', 'updatedAt', 'deletedAt'],
    });
  }
}
