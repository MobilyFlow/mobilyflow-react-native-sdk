import { Button, Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MobilyPurchaseSDK } from 'mobilyflow-react-native-sdk';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { MobilyProduct } from '../../src/entities/mobily-product';
import { ProductButton } from './ProductButton';
import type { MobilySubscriptionOffer } from '../../src/entities/mobily-subscription-offer';
import { MobilyPurchaseError } from '../../src/errors/mobily-purchase-error';

export type AppMobilyFlowProps = {
  sdk: React.RefObject<MobilyPurchaseSDK>;
  reload: () => Promise<void>;
};

export default function AppMobilyFlow(props: AppMobilyFlowProps): JSX.Element {
  const { sdk, reload } = props;

  const [products, setProducts] = useState<MobilyProduct[]>();
  const [storeCountry, setStoreCountry] = useState<string>();
  const [error, setError] = useState('');

  const firstTime = useRef(true);

  const init = useCallback(async () => {
    try {
      const p = await sdk.current.getProducts();
      console.log('Products: ', p);
      setProducts(p);
      setStoreCountry(Platform.OS === 'ios' ? await sdk.current.getStoreCountry() : '-');
      console.log('Done');
    } catch (e: any) {
      setError(`Error: ${e.code} ${e.domain}`);
      console.error('Error: ', e.code, e.domain);
    }
  }, [sdk]);

  useEffect(() => {
    if (firstTime.current) {
      firstTime.current = false;
      init().then();
    }
  }, [init]);

  const handlePurchase = async (product: MobilyProduct, offer?: MobilySubscriptionOffer) => {
    try {
      console.log(`Click ${product.identifier} ${offer?.ios_offerId}`);
      const result = await sdk.current.purchaseProduct(product, { offer });
      console.log('Purchase result = ', result);
    } catch (e: any) {
      if (e instanceof MobilyPurchaseError) {
        console.error('Purchase error: ', e.type);
      } else {
        console.error('Purchase error: ', e);
      }
    }
  };

  const handleRefresh = async () => {
    await reload();
    await init();
  };

  const handleManageSubscriptions = async () => {
    await sdk.current.openManageSubscription();
  };

  const handleTransferOwnership = async () => {
    await sdk.current.requestTransferOwnership();
  };

  const handleSendDiagnostic = () => {
    sdk.current.sendDiagnotic();
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
      <View style={{ marginTop: 20, alignSelf: 'stretch', gap: 5 }}>
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
    backgroundColor: 'white',
  },
});
