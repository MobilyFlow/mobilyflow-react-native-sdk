import { TurboModule, TurboModuleRegistry } from 'react-native';
import { MobilyProduct } from './models/product/mobily-product';
import { MobilySubscriptionGroup } from './models/product/mobily-subscription-group';
import { MobilyCustomerEntitlement } from './models/entitlement/mobily-customer-entitlement';
import { MobilyCustomer } from './models/mobily-customer';
import { MobilyTransferOwnershipStatus } from './enums/mobily-transfer-ownership-status';
import { MobilyEvent } from './models/mobily-event';

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
  initialize(appId: string, apiKey: string, environment: string, options?: MobilyPurchaseSDKOptions): void;
  close(): void;

  login(externalRef: string): Promise<MobilyCustomer>;
  logout(): void;
  getProducts(identifiers: string[], onlyAvailable: boolean): Promise<MobilyProduct[]>;
  getSubscriptionGroups(identifiers: string[], onlyAvailable: boolean): Promise<MobilySubscriptionGroup[]>;
  getSubscriptionGroupById(id: string): Promise<MobilySubscriptionGroup>;

  getEntitlementForSubscription(subscriptionGroupId: string): Promise<MobilyCustomerEntitlement | null>;
  getEntitlement(productId: string): Promise<MobilyCustomerEntitlement | null>;
  getEntitlements(productIds?: string[]): Promise<MobilyCustomerEntitlement[]>;
  getExternalEntitlements(): Promise<MobilyCustomerEntitlement[]>;

  requestTransferOwnership(): Promise<MobilyTransferOwnershipStatus>;
  openManageSubscription(): Promise<void>;
  openRefundDialogForProduct(productId: string): Promise<string>;
  openRefundDialogForTransactionId(transactionId: string): Promise<string>;

  purchaseProduct(productId: string, options?: PurchaseOptions): Promise<MobilyEvent>;

  sendDiagnostic(): Promise<void>;
  getStoreCountry(): Promise<string | null>;
  isBillingAvailable(): Promise<boolean>;
  isForwardingEnable(externalRef: string): Promise<boolean>;

  getCustomer(): Promise<MobilyCustomer | null>;
  getSDKVersion(): Promise<string>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('MobilyflowReactNativeSdk');
