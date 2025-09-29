import { ProductType } from '../enums/product-type';
import { ProductStatus } from '../enums/product-status';
import { MobilyOneTimeProduct } from './mobily-one-time-product';
import { MobilySubscriptionProduct } from './mobily-subscription-product';
import { objectTransformer } from '../utils/object-transformer';

export class MobilyProduct {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  identifier: string;
  externalRef: string;
  appId: string;

  referenceName: string;
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
      mapping: {
        oneTimeProduct: MobilyOneTimeProduct.parseFromAPI,
        subscriptionProduct: MobilySubscriptionProduct.parseFromAPI,
      },
    });
  }
}
