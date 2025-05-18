import { Button, Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Iaphub from 'react-native-iaphub';
import { useCallback, useEffect, useRef, useState } from 'react';
import { MobilyPurchaseError } from '../../../src/errors/mobily-purchase-error';
import type Product from 'react-native-iaphub/lib/typescript/models/product';
import { IapHubProductButton } from './IapHubProductButton';

export default function AppIapHub() {
  const [products, setProducts] = useState<Product[]>();
  const [error, setError] = useState('');

  const firstTime = useRef(true);

  const init = useCallback(async () => {
    try {
      const externalRef =
        Platform.OS === 'ios'
          ? '304f6c8c-18b2-462f-9df0-28b1e3754715' // gregoire-ios
          : '044209a1-8331-4bdc-9a73-8eebbe0acdaa'; // gregoire-android;

      await Iaphub.start({
        appId: '67e64649773f1d55cd6c8097',
        apiKey: '0fDY1VSkUk9eFOPuXUEbTdcIrs7mq',
        enableStorekitV2: true,
        // environment: 'production',
        // lang: 'en',
        userId: externalRef, // gregoire
      });

      const p = await Iaphub.getProductsForSale();
      console.log('Products: ', p);
      setProducts(p);
    } catch (err) {
      console.error(err);
      setError(`${JSON.stringify(err)}`);
    }
  }, []);

  useEffect(() => {
    if (firstTime.current) {
      firstTime.current = false;
      init().then();
    }
  }, [init]);

  const handlePurchase = async (product: Product) => {
    try {
      const startTime = Date.now();
      console.log(`Click ${product.id} ${product.sku}`);
      const result = await Iaphub.buy(product.sku);
      console.log(`Purchase result (${Date.now() - startTime}ms) = `, result);
    } catch (e: any) {
      if (e instanceof MobilyPurchaseError) {
        console.error('Purchase error: ', e.type);
      } else {
        console.error('Purchase error: ', e);
      }
    }
  };

  const handleRefresh = async () => {
    await init();
  };

  const handleManageSubscriptions = async () => {
    await Iaphub.showManageSubscriptions();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>IAPHub React Native</Text>
      {error && <Text style={{ color: 'red' }}>{error}</Text>}

      <ScrollView style={{ alignSelf: 'stretch', marginTop: 20 }}>
        <View style={{ alignItems: 'stretch', alignSelf: 'stretch', gap: 10, padding: 10 }}>
          {products?.map((product) => (
            <IapHubProductButton key={product.id} product={product} handlePress={handlePurchase} />
          ))}
          <View style={{ marginTop: 20, alignSelf: 'stretch', gap: 5 }}>
            <Button title="Refresh" onPress={handleRefresh} />
            <Button title="Manage subscriptions" onPress={handleManageSubscriptions} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
});
