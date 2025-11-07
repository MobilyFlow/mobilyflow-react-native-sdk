import { TurboModule, TurboModuleRegistry } from 'react-native';
import { MobilyProduct } from './models/product/mobily-product';
import { MobilySubscriptionGroup } from './models/product/mobily-subscription-group';
import { MobilyCustomerEntitlement } from './models/entitlement/mobily-customer-entitlement';
import { MobilyCustomer } from './models/mobily-customer';
import { MobilyTransferOwnershipStatus } from './enums/mobily-transfer-ownership-status';
import { MobilyEvent } from './models/mobily-event';
import { MobilyEnvironment } from './enums/mobily-environment';

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
  instantiate(
    appId: string,
    apiKey: string,
    environment: MobilyEnvironment,
    options?: MobilyPurchaseSDKOptions
  ): string;
  close(uuid: string): void;

  login(uuid: string, externalRef: string): Promise<MobilyCustomer>;
  logout(uuid: string): void;
  getProducts(uuid: string, identifiers: string[], onlyAvailable: boolean): Promise<MobilyProduct[]>;
  getSubscriptionGroups(
    uuid: string,
    identifiers: string[],
    onlyAvailable: boolean
  ): Promise<MobilySubscriptionGroup[]>;
  getSubscriptionGroupById(uuid: string, id: string): Promise<MobilySubscriptionGroup>;

  getEntitlementForSubscription(uuid: string, subscriptionGroupId: string): Promise<MobilyCustomerEntitlement | null>;
  getEntitlement(uuid: string, productId: string): Promise<MobilyCustomerEntitlement | null>;
  getEntitlements(uuid: string, productIds?: string[]): Promise<MobilyCustomerEntitlement[]>;
  getExternalEntitlements(uuid: string): Promise<MobilyCustomerEntitlement[]>;

  requestTransferOwnership(uuid: string): Promise<MobilyTransferOwnershipStatus>;
  openManageSubscription(uuid: string): Promise<void>;
  openRefundDialog(uuid: string, productId: string): Promise<boolean>;

  purchaseProduct(uuid: string, productId: string, options?: PurchaseOptions): Promise<MobilyEvent>;

  sendDiagnostic(uuid: string): void;
  getStoreCountry(uuid: string): Promise<string | null>;
  isBillingAvailable(uuid: string): Promise<boolean>;
  isForwardingEnable(uuid: string, externalRef: string): Promise<boolean>;

  getCustomer(uuid: string): Promise<MobilyCustomer | null>;
  getSDKVersion(uuid: string): Promise<string>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('MobilyflowReactNativeSdk');
