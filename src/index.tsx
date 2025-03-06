import MobilyflowReactNativeSdk, {
  type MobilyPurchaseSDKOptions,
} from './NativeMobilyflowReactNativeSdk';

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
