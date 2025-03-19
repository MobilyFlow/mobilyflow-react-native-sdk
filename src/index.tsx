import MobilyflowReactNativeSdk, { type MobilyPurchaseSDKOptions } from './NativeMobilyflowReactNativeSdk';
import { MobilyProduct } from './entities/mobily-product';
import type { WebhookStatus } from './enums/webhook-status';
import type { MobilySubscriptionOffer } from './entities/mobily-subscription-offer';
import { MobilySubscriptionGroup } from './entities/mobily-subscription-group';
import { MobilyCustomerEntitlement } from './entities/mobily-customer-entitlement';

export type PurchaseOptions = {
  offer?: MobilySubscriptionOffer;
  quantity?: number;
};

export class MobilyPurchaseSDK {
  private _uuid: string;

  constructor(appId: string, apiKey: string, environment: number, options?: MobilyPurchaseSDKOptions) {
    console.log('Init');
    this._uuid = MobilyflowReactNativeSdk.instantiate(appId, apiKey, environment, options ?? {});
    console.log('After init: ', this._uuid);
  }

  close() {
    MobilyflowReactNativeSdk.close(this._uuid);
  }

  async login(externalId: string) {
    await MobilyflowReactNativeSdk.login(this._uuid, externalId);
  }

  async getProducts(identifiers?: string[]) {
    const products = await MobilyflowReactNativeSdk.getProducts(this._uuid, identifiers);
    return products.map(MobilyProduct.parseFromAPI);
  }

  async getSubscriptionGroups(identifiers?: string[]) {
    const groups = await MobilyflowReactNativeSdk.getSubscriptionGroups(this._uuid, identifiers);
    return groups.map(MobilySubscriptionGroup.parseFromAPI);
  }

  async getEntitlementForSubscription(subscriptionGroupId: string) {
    const entitlement = await MobilyflowReactNativeSdk.getEntitlementForSubscription(this._uuid, subscriptionGroupId);
    return MobilyCustomerEntitlement.parseFromAPI(entitlement);
  }

  async getEntitlement(productId: string) {
    const entitlement = await MobilyflowReactNativeSdk.getEntitlement(this._uuid, productId);
    return MobilyCustomerEntitlement.parseFromAPI(entitlement);
  }

  async getEntitlements(productIds: string[]) {
    const entitlements = await MobilyflowReactNativeSdk.getEntitlements(this._uuid, productIds);
    return entitlements.map(MobilyCustomerEntitlement.parseFromAPI);
  }

  async requestTransferOwnership() {
    return await MobilyflowReactNativeSdk.requestTransferOwnership(this._uuid);
  }

  async openManageSubscription() {
    return await MobilyflowReactNativeSdk.openManageSubscription(this._uuid);
  }

  // openRefundDialog(transactionId: string): Promise<void>;

  async purchaseProduct(product: MobilyProduct, options?: PurchaseOptions): Promise<WebhookStatus> {
    return await MobilyflowReactNativeSdk.purchaseProduct(this._uuid, product.id, {
      offerId: options?.offer?.id || null,
      quantity: options?.quantity || null,
    });
  }

  sendDiagnotic() {
    return MobilyflowReactNativeSdk.sendDiagnotic(this._uuid);
  }

  async getStoreCountry() {
    return await MobilyflowReactNativeSdk.getStoreCountry(this._uuid);
  }
}
