import { StyleSheet, Text, View } from 'react-native';
import { MobilyPurchaseSDK } from 'mobilyflow-react-native-sdk';
import { useEffect, useRef, useState } from 'react';

export default function App() {
  const [result, setResult] = useState('');
  const firstTime = useRef(true);
  useEffect(() => {
    if (firstTime.current) {
      firstTime.current = false;
      (async () => {
        const sdk = new MobilyPurchaseSDK('', '', 0, { languages: ['en', 'fr'] });
        /*try {
          console.log('Login...');
          await login(instanceId, 'user-external-id');
          console.log('Logged');
        } catch (error: any) {
          console.error('Login error: ', error.code, error.domain);
        }

        try {
          console.log('Get Products...');
          const products = await getProducts(instanceId, undefined);
          console.log('Get Products done: ', products);
        } catch (error: any) {
          console.error('Get Products Error: ', error.code, error.domain);
        }*/

        try {
          console.log('getEntitlementForSubscription...');
          const entitlements = sdk.getEntitlementForSubscription('xxx');
          console.log('getEntitlementForSubscription done: ', entitlements);
        } catch (error: any) {
          console.error('Login error: ', error.code, error.domain);
        }

        setResult(sdk['_uuid']);
      })();
    }
  }, []);
  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
