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
        const sdk = new MobilyPurchaseSDK(
          'caecc000-45ce-49b3-b218-46c1d985ae85',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYXBwLXRva2VuIiwic3ViIjoiY2FlY2MwMDAtNDVjZS00OWIzLWIyMTgtNDZjMWQ5ODVhZTg1Iiwic2NvcGUiOjEwLCJpYXQiOjE3MzczNTYyNzIsImV4cCI6MzMyOTQ5NTYyNzJ9.2GDcRmX2dJEfN3S4HANygmOwXqSyGOIsTXVHu5LrLtc',
          0,
          {
            languages: ['en', 'fr'],
            apiURL: 'https://staging.mobilyflow-api.com/v1/',
          }
        );
        try {
          console.log('Login...');
          await sdk.login('user-external-id');
          console.log('Logged');
        } catch (error: any) {
          console.error('Login error: ', error.code, error.domain);
        }

        try {
          console.log('Get Products...');
          const products = await sdk.getProducts(undefined);
          console.log('Get Products done: ', products);
        } catch (error: any) {
          console.error('Get Products Error: ', error.code, error.domain);
        }

        /*try {
          console.log('getEntitlementForSubscription...');
          const entitlements = await sdk.getEntitlementForSubscription('xxx');
          console.log('getEntitlementForSubscription done: ', entitlements);
        } catch (error: any) {
          console.error('Login error: ', error.code, error.domain);
        }*/

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
