import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import { MobilyProduct } from './entities/mobily-product';
import { MobilySubscriptionGroup } from './entities/mobily-subscription-group';
import { MobilyCustomerEntitlement } from './entities/mobily-customer-entitlement';
import { WebhookStatus } from './enums/webhook-status';
import type { MobilyCustomer } from './entities/mobily-customer';
import { TransferOwnershipStatus } from './enums/transfer-ownership-status';

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

  login(uuid: string, externalRef: string): Promise<MobilyCustomer>;
  getProducts(uuid: string, identifiers: string[], onlyAvailable: boolean): Promise<MobilyProduct[]>;
  getSubscriptionGroups(
    uuid: string,
    identifiers: string[],
    onlyAvailable: boolean
  ): Promise<MobilySubscriptionGroup[]>;

  getEntitlementForSubscription(uuid: string, subscriptionGroupId: string): Promise<MobilyCustomerEntitlement | null>;
  getEntitlement(uuid: string, productId: string): Promise<MobilyCustomerEntitlement | null>;
  getEntitlements(uuid: string, productIds?: string[]): Promise<MobilyCustomerEntitlement[]>;
  getExternalEntitlements(uuid: string): Promise<MobilyCustomerEntitlement[]>;

  requestTransferOwnership(uuid: string): Promise<TransferOwnershipStatus>;
  openManageSubscription(uuid: string): Promise<void>;
  openRefundDialog(uuid: string, productId: string): Promise<boolean>;

  purchaseProduct(uuid: string, productId: string, options?: PurchaseOptions): Promise<WebhookStatus>;

  sendDiagnotic(uuid: string): void;
  getStoreCountry(uuid: string): Promise<string>;
  isForwardingEnable(uuid: string, externalRef: string): Promise<boolean>;

  getCustomer(uuid: string): Promise<MobilyCustomer | null>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('MobilyflowReactNativeSdk');
