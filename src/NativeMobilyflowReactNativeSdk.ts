import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import { MobilyProduct } from './entities/mobily-product';
import { MobilySubscriptionGroup } from './entities/mobily-subscription-group';
import { MobilyCustomerEntitlement } from './entities/mobily-customer-entitlement';
import { WebhookStatus } from './enums/webhook-status';

export type MobilyPurchaseSDKOptions = {
  languages?: string[];
  debug?: boolean;
  apiURL?: string;
};

type PurchaseOptions = {
  offerId: string;
  quantity: number;
};

export interface Spec extends TurboModule {
  instantiate(appId: string, apiKey: string, environment: number, options?: MobilyPurchaseSDKOptions): string;
  close(uuid: string): void;

  login(uuid: string, externalId: string): Promise<void>;
  getProducts(uuid: string, identifiers?: string[]): Promise<MobilyProduct[]>;
  getSubscriptionGroups(uuid: string, identifiers?: string[]): Promise<MobilySubscriptionGroup[]>;

  getEntitlementForSubscription(uuid: string, subscriptionGroupId: string): Promise<MobilyCustomerEntitlement | null>;
  getEntitlement(uuid: string, productId: string): Promise<MobilyCustomerEntitlement | null>;
  getEntitlements(uuid: string, productIds: string[]): Promise<MobilyCustomerEntitlement[]>;

  requestTransferOwnership(uuid: string): Promise<void>;
  openManageSubscription(uuid: string): Promise<void>;
  // openRefundDialog(uuid: string, transactionId: string): Promise<void>;

  purchaseProduct(uuid: string, productId: string, options?: PurchaseOptions): Promise<WebhookStatus>;

  sendDiagnotic(uuid: string): void;
  getStoreCountry(uuid: string): Promise<string>;
}

// export default TurboModuleRegistry.getEnforcing<Spec>('MobilyflowReactNativeSdk');
console.log('Before module');
const module = TurboModuleRegistry.getEnforcing<Spec>('MobilyflowReactNativeSdk');
console.log('after module ', module);

export default module;
