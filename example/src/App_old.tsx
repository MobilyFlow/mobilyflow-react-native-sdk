import AppMobilyFlow from './AppMobilyFlow';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';
import { MobilyEnvironment, MobilyPurchaseSDK } from 'mobilyflow-react-native-sdk';

export default function App() {
  const sdk = useRef<MobilyPurchaseSDK>();
  const firstTime = useRef(true);
  const [isLoading, setLoading] = useState(true);

  const init = useCallback(async () => {
    if (!sdk.current) {
      sdk.current = new MobilyPurchaseSDK(
        'caecc000-45ce-49b3-b218-46c1d985ae85',
        '7aa18f9720a5c9731d17f5c54e89bdd218647f71269eed2f6c27c8fa5924da84',
        MobilyEnvironment.DEVELOPMENT,
        {
          // languages: ['en', 'fr'],
          apiURL: 'https://mobilyflow.eu-1.sharedwithexpose.com/v1/',
          // apiURL: 'https://api-staging.mobilyflow.com/v1/',
          debug: true,
        },
      );
    }

    try {
      const externalRef =
        Platform.OS === 'ios'
          ? 'gregoire-ios-rn' // gregoire-ios
          : 'gregoire-android'; // gregoire-android;
      // const externalRef = `random-user-${Platform.OS}`;

      const customer = await sdk.current.login(externalRef);
      console.log('Customer = ', customer);
      console.log('SDK Version = ', await sdk.current.getSDKVersion());

      console.log('Customer = ', await sdk.current.getCustomer());
      console.log('Entitlements = ', await sdk.current.getEntitlements());
      setLoading(false);
    } catch (e: any) {
      console.error('Error: ', e);
    }
  }, []);

  useEffect(() => {
    if (firstTime.current) {
      firstTime.current = false;
      init().then();
    }
  }, [init]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <AppMobilyFlow sdk={sdk} reload={init} />;
}
