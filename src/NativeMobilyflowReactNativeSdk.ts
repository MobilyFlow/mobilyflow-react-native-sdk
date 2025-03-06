import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export type MobilyPurchaseSDKOptions = {
  languages?: string[];
  debug?: boolean;
  apiURL?: string;
};

export interface Spec extends TurboModule {
  instantiate(
    appId: string,
    apiKey: string,
    environment: number,
    options?: MobilyPurchaseSDKOptions
  ): string;
}

const MobilyflowReactNativeSdk = TurboModuleRegistry.getEnforcing<Spec>(
  'MobilyflowReactNativeSdk'
);

console.log('Module = ', MobilyflowReactNativeSdk);

export default MobilyflowReactNativeSdk;
