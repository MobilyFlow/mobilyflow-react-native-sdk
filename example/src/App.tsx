import AppIapHub from './iaphub/AppIapHub';
import AppMobilyFlow from './AppMobilyFlow';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';
import { MobilyPurchaseSDK } from 'mobilyflow-react-native-sdk';
import { MobilyEnvironment } from '../../src/enums/mobily-environment';

export default function App() {
  const [isForwardingEnable, setForwardingEnable] = useState<boolean>(undefined);

  const sdk = useRef<MobilyPurchaseSDK>();
  const firstTime = useRef(true);

  const init = useCallback(async () => {
    if (!sdk.current) {
      sdk.current = new MobilyPurchaseSDK(
        'caecc000-45ce-49b3-b218-46c1d985ae85',
        '7aa18f9720a5c9731d17f5c54e89bdd218647f71269eed2f6c27c8fa5924da84',
        MobilyEnvironment.DEVELOPMENT,
        {
          // languages: ['en', 'fr'],
          // apiURL: 'https://mobilyflow.eu-1.sharedwithexpose.com/v1/',
          // apiURL: 'https://api-staging.mobilyflow.com/v1/',
          debug: true,
        }
      );
    }

    try {
      const externalRef =
        Platform.OS === 'ios'
          ? '304f6c8c-18b2-462f-9df0-28b1e3754715' // gregoire-ios
          : '044209a1-8331-4bdc-9a73-8eebbe0acdaa'; // gregoire-android;

      const customer = await sdk.current.login(externalRef);
      console.log('Customer = ', customer);
      setForwardingEnable(customer.isForwardingEnable);

      console.log('Customer = ', await sdk.current.getCustomer());
      console.log('Entitlements = ', await sdk.current.getEntitlements());
      // setForwardingEnable(await sdk.current.isForwardingEnable(externalRef));
    } catch (e: any) {
      console.error('setForwardingEnable error: ', e);
      setForwardingEnable(true);
    }
  }, []);

  useEffect(() => {
    if (firstTime.current) {
      firstTime.current = false;
      init().then();
    }
  }, [init]);

  if (isForwardingEnable === undefined) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return isForwardingEnable ? <AppIapHub /> : <AppMobilyFlow sdk={sdk} reload={init} />;
  // return <AppIapHub />;
}
