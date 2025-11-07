import { objectTransformer } from '../../utils/object-transformer';

export class MobilyOneTimeProduct {
  isConsumable: boolean;
  isMultiQuantity: boolean;

  static parseFromAPI(obj: MobilyOneTimeProduct) {
    return objectTransformer(obj, {});
  }
}
