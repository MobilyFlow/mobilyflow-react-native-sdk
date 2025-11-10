import { MobilyProduct } from 'mobilyflow-react-native-sdk';
import { objectTransformer } from '../../utils/object-transformer';

export class MobilyItem {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  productId: string;
  quantity: number;
  Product: MobilyProduct | null;

  static parseFromAPI(obj: MobilyItem) {
    return objectTransformer(obj, {
      dates: ['createdAt', 'updatedAt'],
      nullIfUndefined: ['Product'],
      mapping: {
        Product: MobilyProduct.parseFromAPI,
      },
    });
  }
}
