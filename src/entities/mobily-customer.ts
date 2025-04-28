import { objectTransformer } from '../utils/object-transformer';

export class MobilyCustomer {
  public id: string;
  public createdAt: Date;
  public updatedAt: Date;
  public externalRef: string;
  public isForwardingEnable: boolean;

  static parseFromAPI(obj: MobilyCustomer) {
    return objectTransformer(obj, { dates: ['createdAt', 'updatedAt'] });
  }
}
