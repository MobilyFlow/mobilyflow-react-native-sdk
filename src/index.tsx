import MobilyflowReactNativeSdk, { type MobilyPurchaseSDKOptions } from './NativeMobilyflowReactNativeSdk';
import type { MobilyProduct } from './entities/mobily-product';
import type { WebhookStatus } from './enums/webhook-status';
import type { MobilySubscriptionOffer } from './entities/mobily-subscription-offer';

export type PurchaseOptions = {
  offer: MobilySubscriptionOffer;
  quantity: number;
};

export class MobilyPurchaseSDK {
  private _uuid: string;

  constructor(appId: string, apiKey: string, environment: number, options?: MobilyPurchaseSDKOptions) {
    this._uuid = MobilyflowReactNativeSdk.instantiate(appId, apiKey, environment, options);
  }

  close() {
    MobilyflowReactNativeSdk.close(this._uuid);
  }

  async login(externalId: string) {
    await MobilyflowReactNativeSdk.login(this._uuid, externalId);
  }

  async getProducts(identifiers?: string[]) {
    return await MobilyflowReactNativeSdk.getProducts(this._uuid, identifiers);
  }

  async getSubscriptionGroups(identifiers?: string[]) {
    return await MobilyflowReactNativeSdk.getSubscriptionGroups(this._uuid, identifiers);
  }

  async getEntitlementForSubscription(subscriptionGroupId: string) {
    return await MobilyflowReactNativeSdk.getEntitlementForSubscription(this._uuid, subscriptionGroupId);
  }

  async getEntitlement(productId: string) {
    return await MobilyflowReactNativeSdk.getEntitlement(this._uuid, productId);
  }

  async getEntitlements(productIds: string[]) {
    return await MobilyflowReactNativeSdk.getEntitlements(this._uuid, productIds);
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
      offerId: options?.offer?.id,
      quantity: options?.quantity,
    });
  }

  sendDiagnotic() {
    return MobilyflowReactNativeSdk.sendDiagnotic(this._uuid);
  }

  async getStoreCountry() {
    return await MobilyflowReactNativeSdk.getStoreCountry(this._uuid);
  }
}
