import { Button, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MobilyPurchaseSDK } from 'mobilyflow-react-native-sdk';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { MobilyProduct } from '../../src/entities/mobily-product';
import { ProductButton } from './ProductButton';
import type { MobilySubscriptionOffer } from '../../src/entities/mobily-subscription-offer';
import { MobilyEnvironment } from '../../src/enums/mobily-environment';

const sdk = new MobilyPurchaseSDK(
  'caecc000-45ce-49b3-b218-46c1d985ae85',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYXBwLXRva2VuIiwic3ViIjoiY2FlY2MwMDAtNDVjZS00OWIzLWIyMTgtNDZjMWQ5ODVhZTg1Iiwic2NvcGUiOjEwLCJpYXQiOjE3MzczNTYyNzIsImV4cCI6MzMyOTQ5NTYyNzJ9.2GDcRmX2dJEfN3S4HANygmOwXqSyGOIsTXVHu5LrLtc',
  MobilyEnvironment.DEVELOPMENT,
  {
    // languages: ['en', 'fr'],
    apiURL: 'https://api-staging.mobilyflow.com/v1/',
  }
);

export default function App() {
  const [products, setProducts] = useState<MobilyProduct[]>();
  const [storeCountry, setStoreCountry] = useState<string>();
  const [error, setError] = useState('');

  const firstTime = useRef(true);

  const init = useCallback(async () => {
    try {
      await sdk.login('914b9a20-950b-44f7-bd7b-d81d57992294'); // gregoire
      const p = await sdk.getProducts();
      console.log('Products: ', p);
      setProducts(p);
      setStoreCountry(await sdk.getStoreCountry());
      console.log('Done');
    } catch (e: any) {
      setError(`Error: ${e.code} ${e.domain}`);
      console.error('Login error: ', e.code, e.domain);
    }
  }, []);

  useEffect(() => {
    if (firstTime.current) {
      firstTime.current = false;
      init().then();
    }
  }, [init]);

  const handlePurchase = async (product: MobilyProduct, offer?: MobilySubscriptionOffer) => {
    try {
      console.log(`Click ${product.identifier} ${offer?.ios_offerId}`);
      const result = await sdk.purchaseProduct(product, { offer });
      console.log('Purchase result = ', result);
    } catch (e) {
      console.error('Purchase error = ', e);
    }
  };

  const handleRefresh = async () => {
    await init();
  };

  const handleManageSubscriptions = async () => {
    await sdk.openManageSubscription();
  };

  const handleTransferOwnership = async () => {
    await sdk.requestTransferOwnership();
  };

  const handleSendDiagnostic = () => {
    sdk.sendDiagnotic();
  };

  const handleRefundRequest = () => {
    // sdk.re
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>MobilyFlow React Native</Text>
      <Text>{storeCountry}</Text>
      {error && <Text style={{ color: 'red' }}>{error}</Text>}

      <ScrollView style={{ alignSelf: 'stretch', marginTop: 20 }}>
        <View style={{ alignItems: 'stretch', alignSelf: 'stretch', gap: 10, padding: 10 }}>
          {products?.map((product) => (
            <View key={product.id} style={{ gap: 10 }}>
              <ProductButton product={product} handlePress={handlePurchase} />
              {product?.subscriptionProduct?.promotionalOffers?.length > 0 && (
                <View style={{ gap: 10, paddingHorizontal: 10 }}>
                  {product?.subscriptionProduct?.promotionalOffers?.map((offer) => (
                    <ProductButton key={offer.id} product={product} offer={offer} handlePress={handlePurchase} />
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={{ marginTop: 20 }}>
        <Button title="Refresh" onPress={handleRefresh} />
        <Button title="Manage subscriptions" onPress={handleManageSubscriptions} />
        <Button title="Transfer Ownership" onPress={handleTransferOwnership} />
        <Button title="Send diagnostic" onPress={handleSendDiagnostic} />
        <Button title="Refund Request" onPress={handleRefundRequest} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
