import MobilyflowReactNativeSdk, { type MobilyPurchaseSDKOptions } from './NativeMobilyflowReactNativeSdk';
import { MobilyProduct } from './models/product/mobily-product';
import { MobilySubscriptionGroup } from './models/product/mobily-subscription-group';
import { MobilyCustomerEntitlement } from './models/entitlement/mobily-customer-entitlement';
import { Platform as RNPlatform } from 'react-native';
import { MobilyError } from './errors/mobily-error';
import { MobilyPurchaseError } from './errors/mobily-purchase-error';
import { MobilyTransferOwnershipError } from './errors/mobily-transfer-ownership-error';
import { MobilyCustomer } from './models/mobily-customer';
import { PurchaseOptions } from './models/internal/purchase-options';
import { MobilyTransferOwnershipStatus } from './enums/mobily-transfer-ownership-status';
import { MobilyEvent } from './models/mobily-event';
import { MobilyRefundDialogResult } from './enums/mobily-refund-dialog-result';

function throwError(error: any) {
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

export const MobilyPurchaseSDK = {
  initialize: (appId: string, apiKey: string, environment: string, options?: MobilyPurchaseSDKOptions) => {
    try {
      MobilyflowReactNativeSdk.initialize(appId, apiKey, environment, options ?? {});
    } catch (error: any) {
      throw throwError(error);
    }
  },

  close: () => {
    try {
      MobilyflowReactNativeSdk.close();
    } catch (error: any) {
      throw throwError(error);
    }
  },

  login: async (externalRef: string): Promise<MobilyCustomer> => {
    try {
      const customer = await MobilyflowReactNativeSdk.login(externalRef);
      return MobilyCustomer.parseFromAPI(customer);
    } catch (error: any) {
      throw throwError(error);
    }
  },

  logout: () => {
    try {
      return MobilyflowReactNativeSdk.logout();
    } catch (error: any) {
      throw throwError(error);
    }
  },

  getProducts: async (identifiers?: string[], onlyAvailable = false): Promise<MobilyProduct[]> => {
    try {
      const products = await MobilyflowReactNativeSdk.getProducts(identifiers, onlyAvailable);
      return products.map(MobilyProduct.parseFromAPI);
    } catch (error: any) {
      throw throwError(error);
    }
  },

  getSubscriptionGroups: async (identifiers?: string[], onlyAvailable = false): Promise<MobilySubscriptionGroup[]> => {
    try {
      const groups = await MobilyflowReactNativeSdk.getSubscriptionGroups(identifiers, onlyAvailable);
      return groups.map(MobilySubscriptionGroup.parseFromAPI);
    } catch (error: any) {
      throw throwError(error);
    }
  },

  getSubscriptionGroupById: async (id: string): Promise<MobilySubscriptionGroup> => {
    try {
      const group = await MobilyflowReactNativeSdk.getSubscriptionGroupById(id);
      return MobilySubscriptionGroup.parseFromAPI(group);
    } catch (error: any) {
      throw throwError(error);
    }
  },

  getEntitlementForSubscription: async (subscriptionGroupId: string): Promise<MobilyCustomerEntitlement | null> => {
    try {
      const entitlement = await MobilyflowReactNativeSdk.getEntitlementForSubscription(subscriptionGroupId);
      return MobilyCustomerEntitlement.parseFromAPI(entitlement);
    } catch (error: any) {
      throw throwError(error);
    }
  },

  getEntitlement: async (productId: string): Promise<MobilyCustomerEntitlement | null> => {
    try {
      const entitlement = await MobilyflowReactNativeSdk.getEntitlement(productId);
      return MobilyCustomerEntitlement.parseFromAPI(entitlement);
    } catch (error: any) {
      throw throwError(error);
    }
  },

  getEntitlements: async (productIds?: string[]): Promise<MobilyCustomerEntitlement[]> => {
    try {
      const entitlements = await MobilyflowReactNativeSdk.getEntitlements(productIds);
      return entitlements.map(MobilyCustomerEntitlement.parseFromAPI);
    } catch (error: any) {
      throw throwError(error);
    }
  },

  getExternalEntitlements: async (): Promise<MobilyCustomerEntitlement[]> => {
    try {
      const entitlements = await MobilyflowReactNativeSdk.getExternalEntitlements();
      return entitlements.map(MobilyCustomerEntitlement.parseFromAPI);
    } catch (error: any) {
      throw throwError(error);
    }
  },

  requestTransferOwnership: async (): Promise<MobilyTransferOwnershipStatus> => {
    try {
      return await MobilyflowReactNativeSdk.requestTransferOwnership();
    } catch (error: any) {
      throw throwError(error);
    }
  },

  openManageSubscription: async () => {
    try {
      return await MobilyflowReactNativeSdk.openManageSubscription();
    } catch (error: any) {
      throw throwError(error);
    }
  },

  openRefundDialogForProduct: async (product: MobilyProduct): Promise<MobilyRefundDialogResult> => {
    if (RNPlatform.OS === 'android') {
      throw new Error('openRefundDialog not implemented on Android');
    } else {
      try {
        const result = await MobilyflowReactNativeSdk.openRefundDialogForProduct(product.id);
        return result as MobilyRefundDialogResult;
      } catch (error: any) {
        throw throwError(error);
      }
    }
  },

  openRefundDialogForTransactionId: async (transactionId: string): Promise<MobilyRefundDialogResult> => {
    if (RNPlatform.OS === 'android') {
      throw new Error('openRefundDialog not implemented on Android');
    } else {
      try {
        const result = await MobilyflowReactNativeSdk.openRefundDialogForTransactionId(transactionId);
        return result as MobilyRefundDialogResult;
      } catch (error: any) {
        throw throwError(error);
      }
    }
  },

  purchaseProduct: async (product: MobilyProduct, options?: PurchaseOptions): Promise<MobilyEvent> => {
    try {
      return await MobilyflowReactNativeSdk.purchaseProduct(product.id, {
        offerId: options?.offer?.id || null,
        quantity: options?.quantity || null,
      });
    } catch (error: any) {
      throw throwError(error);
    }
  },

  sendDiagnostic: async () => {
    try {
      return await MobilyflowReactNativeSdk.sendDiagnostic();
    } catch (error: any) {
      throw throwError(error);
    }
  },

  getStoreCountry: async (): Promise<string | null> => {
    try {
      return await MobilyflowReactNativeSdk.getStoreCountry();
    } catch (error: any) {
      throw throwError(error);
    }
  },

  isBillingAvailable: async (): Promise<boolean> => {
    try {
      return await MobilyflowReactNativeSdk.isBillingAvailable();
    } catch (error: any) {
      throw throwError(error);
    }
  },

  isForwardingEnable: async (externalRef: string) => {
    try {
      return await MobilyflowReactNativeSdk.isForwardingEnable(externalRef);
    } catch (error: any) {
      throw throwError(error);
    }
  },

  getCustomer: async () => {
    try {
      const customer = await MobilyflowReactNativeSdk.getCustomer();
      return MobilyCustomer.parseFromAPI(customer);
    } catch (error: any) {
      throw throwError(error);
    }
  },

  getSDKVersion: async () => {
    try {
      return await MobilyflowReactNativeSdk.getSDKVersion();
    } catch (error: any) {
      throw throwError(error);
    }
  },
};
