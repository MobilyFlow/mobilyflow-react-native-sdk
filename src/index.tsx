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

export function login(uuid: string, externalId: string) {
  MobilyflowReactNativeSdk.login(uuid, externalId);
}
