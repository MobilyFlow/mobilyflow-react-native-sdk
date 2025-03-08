import type { MobilyProduct } from './mobily-product';

export interface MobilySubscriptionGroup {
  id: string;
  identifier: string;
  name: string;
  details: string;
  ios_groupId: string;
  extras: any;
  products: MobilyProduct[];
}
