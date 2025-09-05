import { MobilyProduct } from './mobily-product';
import { objectTransformer } from '../utils/object-transformer';

export class MobilySubscriptionGroup {
  id: string;
  identifier: string;
  referenceName: string;
  name: string;
  description: string;
  ios_groupId: string;
  extras: any;
  products: MobilyProduct[];

  static parseFromAPI(obj: MobilySubscriptionGroup) {
    return objectTransformer(obj, {
      mapping: {
        products: MobilyProduct.parseFromAPI,
      },
    });
  }
}
