import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

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
  login(uuid: string, externalId: string): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'MobilyflowReactNativeSdk'
);
