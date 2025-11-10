import { MobilyProduct } from './mobily-product';
import { objectTransformer } from '../../utils/object-transformer';

export class MobilySubscriptionGroup {
  id: string;
  identifier: string;
  referenceName: string;
  name: string;
  description: string;
  extras: any | null;
  Products: MobilyProduct[];

  static parseFromAPI(obj: MobilySubscriptionGroup) {
    obj.Products ??= [];
    return objectTransformer(obj, {
      nullIfUndefined: ['extras'],
      mapping: {
        Products: MobilyProduct.parseFromAPI,
      },
    });
  }
}
