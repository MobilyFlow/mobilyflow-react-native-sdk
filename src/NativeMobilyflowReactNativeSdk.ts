import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

/*export type NativeError = {
  domain: string;
  code: number;
};*/

export type MobilyPurchaseSDKOptions = {
  languages?: string[];
  debug?: boolean;
  apiURL?: string;
};

export interface Spec extends TurboModule {
  playground(): string;
  instantiate(
    appId: string,
    apiKey: string,
    environment: number,
    options?: MobilyPurchaseSDKOptions
  ): string;
  login(uuid: string, externalId: string): Promise<void>;
  getProducts(
    uuid: string,
    identifiers?: string[]
  ): Promise<{ hello: string }[]>;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'MobilyflowReactNativeSdk'
);
