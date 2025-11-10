import { MobilySubscriptionOffer } from './mobily-subscription-offer';
import { objectTransformer } from '../../utils/object-transformer';
import { PeriodUnit } from '../../enums/period-unit';

export class MobilySubscriptionProduct {
  periodCount: number;
  periodUnit: PeriodUnit;
  groupLevel: number;
  groupId: string;
  ios_groupId: string | null;

  freeTrial: MobilySubscriptionOffer | null;
  promotionalOffers: MobilySubscriptionOffer[];

  static parseFromAPI(obj: MobilySubscriptionProduct) {
    return objectTransformer(obj, {
      nullIfUndefined: ['freeTrial', 'ios_groupId'],
      mapping: {
        freeTrial: MobilySubscriptionOffer.parseFromAPI,
        promotionalOffers: MobilySubscriptionOffer.parseFromAPI,
      },
    });
  }
}
