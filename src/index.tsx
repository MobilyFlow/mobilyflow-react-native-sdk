import MobilyflowReactNativeSdk, {
  type MobilyPurchaseSDKOptions,
} from './NativeMobilyflowReactNativeSdk';

export function playground() {
  return MobilyflowReactNativeSdk.playground();
}

export function instantiate(
  appId: string,
  apiKey: string,
  environment: number,
  options?: MobilyPurchaseSDKOptions
): string {
  return MobilyflowReactNativeSdk.instantiate(
    appId,
    apiKey,
    environment,
    options
  );
}

export async function login(uuid: string, externalId: string) {
  await MobilyflowReactNativeSdk.login(uuid, externalId);
}

export async function getProducts(uuid: string, identifiers?: string[]) {
  return await MobilyflowReactNativeSdk.getProducts(uuid, identifiers);
}

export function getEntitlementForSubscription(
  uuid: string,
  subscriptionGroupId: string
) {
  return MobilyflowReactNativeSdk.getEntitlementForSubscription(
    uuid,
    subscriptionGroupId
  );
}
