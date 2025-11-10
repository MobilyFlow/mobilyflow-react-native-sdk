import { objectTransformer } from '../utils/object-transformer';

export class MobilyCustomer {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  externalRef: string;
  forwardNotificationEnable: boolean;

  static parseFromAPI(obj: MobilyCustomer) {
    return objectTransformer(obj, { dates: ['createdAt', 'updatedAt'] });
  }
}
