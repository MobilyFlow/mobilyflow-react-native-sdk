import MobilyflowReactNativeSdk, { type MobilyPurchaseSDKOptions } from './NativeMobilyflowReactNativeSdk';
import { MobilyProduct } from './entities/mobily-product';
import type { WebhookStatus } from './enums/webhook-status';
import type { MobilySubscriptionOffer } from './entities/mobily-subscription-offer';
import { MobilySubscriptionGroup } from './entities/mobily-subscription-group';
import { MobilyCustomerEntitlement } from './entities/mobily-customer-entitlement';
import { Platform as RNPlatform } from 'react-native';
import { MobilyError } from './errors/mobily-error';
import { MobilyPurchaseError } from './errors/mobily-purchase-error';
import { MobilyTransferOwnershipError } from './errors/mobily-transfer-ownership-error';
import { MobilyCustomer } from './entities/mobily-customer';

export type PurchaseOptions = {
  offer?: MobilySubscriptionOffer;
  quantity?: number;
};

export class MobilyPurchaseSDK {
  private _uuid: string;

  constructor(appId: string, apiKey: string, environment: number, options?: MobilyPurchaseSDKOptions) {
    this._uuid = MobilyflowReactNativeSdk.instantiate(appId, apiKey, environment, options ?? {});
  }

  private throwError(error: any) {
    if (RNPlatform.OS === 'android') {
      switch (error.name) {
        case 'com.mobilyflow.mobilypurchasesdk.Exceptions.MobilyException':
          return new MobilyError(parseInt(error.code, 10), error.message, error.nativeStackAndroid);
        case 'com.mobilyflow.mobilypurchasesdk.Exceptions.MobilyPurchaseException':
          return new MobilyPurchaseError(parseInt(error.code, 10), error.message, error.nativeStackAndroid);
        case 'com.mobilyflow.mobilypurchasesdk.Exceptions.MobilyTransferOwnershipException':
          return new MobilyTransferOwnershipError(parseInt(error.code, 10), error.message, error.nativeStackAndroid);
      }
    } else {
      switch (error.domain) {
        case 'MobilyflowSDK.MobilyError':
          return new MobilyError(parseInt(error.code, 10), error.message, error.nativeStackIOS);
        case 'MobilyflowSDK.MobilyPurchaseError':
          return new MobilyPurchaseError(parseInt(error.code, 10), error.message, error.nativeStackIOS);
        case 'MobilyflowSDK.MobilyTransferOwnershipError':
          return new MobilyTransferOwnershipError(parseInt(error.code, 10), error.message, error.nativeStackIOS);
      }
    }

    return error;
  }

  close() {
    try {
      MobilyflowReactNativeSdk.close(this._uuid);
    } catch (error: any) {
      throw this.throwError(error);
    }
  }

  async login(externalRef: string) {
    try {
      const customer = await MobilyflowReactNativeSdk.login(this._uuid, externalRef);
      return MobilyCustomer.parseFromAPI(customer);
    } catch (error: any) {
      throw this.throwError(error);
    }
  }

  async getProducts(identifiers?: string[], onlyAvailable = false): Promise<MobilyProduct[]> {
    try {
      const products = await MobilyflowReactNativeSdk.getProducts(this._uuid, identifiers, onlyAvailable);
      return products.map(MobilyProduct.parseFromAPI);
    } catch (error: any) {
      throw this.throwError(error);
    }
  }

  async getSubscriptionGroups(identifiers?: string[], onlyAvailable = false) {
    try {
      const groups = await MobilyflowReactNativeSdk.getSubscriptionGroups(this._uuid, identifiers, onlyAvailable);
      return groups.map(MobilySubscriptionGroup.parseFromAPI);
    } catch (error: any) {
      throw this.throwError(error);
    }
  }

  async getEntitlementForSubscription(subscriptionGroupId: string) {
    try {
      const entitlement = await MobilyflowReactNativeSdk.getEntitlementForSubscription(this._uuid, subscriptionGroupId);
      return MobilyCustomerEntitlement.parseFromAPI(entitlement);
    } catch (error: any) {
      throw this.throwError(error);
    }
  }

  async getEntitlement(productId: string) {
    try {
      const entitlement = await MobilyflowReactNativeSdk.getEntitlement(this._uuid, productId);
      return MobilyCustomerEntitlement.parseFromAPI(entitlement);
    } catch (error: any) {
      throw this.throwError(error);
    }
  }

  async getEntitlements(productIds?: string[]) {
    try {
      const entitlements = await MobilyflowReactNativeSdk.getEntitlements(this._uuid, productIds);
      return entitlements.map(MobilyCustomerEntitlement.parseFromAPI);
    } catch (error: any) {
      throw this.throwError(error);
    }
  }

  async requestTransferOwnership() {
    try {
      return await MobilyflowReactNativeSdk.requestTransferOwnership(this._uuid);
    } catch (error: any) {
      throw this.throwError(error);
    }
  }

  async openManageSubscription() {
    try {
      return await MobilyflowReactNativeSdk.openManageSubscription(this._uuid);
    } catch (error: any) {
      throw this.throwError(error);
    }
  }

  async openRefundDialog(productId: string): Promise<boolean> {
    if (RNPlatform.OS === 'android') {
      throw new Error('openRefundDialog not implemented on Android');
    } else {
      try {
        return await MobilyflowReactNativeSdk.openRefundDialog(this._uuid, productId);
      } catch (error: any) {
        throw this.throwError(error);
      }
    }
  }

  async purchaseProduct(product: MobilyProduct, options?: PurchaseOptions): Promise<WebhookStatus> {
    try {
      return await MobilyflowReactNativeSdk.purchaseProduct(this._uuid, product.id, {
        offerId: options?.offer?.id || null,
        quantity: options?.quantity || null,
      });
    } catch (error: any) {
      throw this.throwError(error);
    }
  }

  sendDiagnotic() {
    try {
      return MobilyflowReactNativeSdk.sendDiagnotic(this._uuid);
    } catch (error: any) {
      throw this.throwError(error);
    }
  }

  async getStoreCountry() {
    if (RNPlatform.OS === 'android') {
      throw new Error('getStoreCountry not implemented on Android');
    } else {
      try {
        return await MobilyflowReactNativeSdk.getStoreCountry(this._uuid);
      } catch (error: any) {
        throw this.throwError(error);
      }
    }
  }

  async isForwardingEnable(externalRef: string) {
    try {
      return await MobilyflowReactNativeSdk.isForwardingEnable(this._uuid, externalRef);
    } catch (error: any) {
      throw this.throwError(error);
    }
  }

  async getCustomer() {
    try {
      return await MobilyflowReactNativeSdk.getCustomer(this._uuid);
    } catch (error: any) {
      throw this.throwError(error);
    }
  }
}
