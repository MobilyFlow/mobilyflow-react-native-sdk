import { Box } from '../../components/uikit/Box';
import { Text } from '../../components/uikit/text';
import { MobilyProductType, MobilyPurchaseSDK, MobilyProduct } from 'mobilyflow-react-native-sdk';
import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, ScrollView, View, Platform } from 'react-native';
import { ProductButton } from '../../components/product-button';
import { usePurchaseProduct } from '../../services/use-purchase-product';
import { DialogManager } from '@react-stateless-dialog/core';
import { useCallback } from 'react';
import { PurchaseMultiQuantityProductDialog } from '../../components/dialog/purchase-multi-quantity-product-dialog';

export const OneTimeScreen = () => {
  const {
    data,
    error,
    isFetching: isLoading,
  } = useQuery({
    queryKey: ['mobilyflow', 'products'],
    queryFn: async () => {
      console.log('[Mobilyflow] getProducts');
      const result = await MobilyPurchaseSDK.getProducts();
      console.log('[Mobilyflow] getProducts done');
      return result;
    },
  });

  const products = data?.filter((x) => x.type === MobilyProductType.ONE_TIME);

  const purchaseProduct = usePurchaseProduct();
  const handlePurchase = useCallback(
    async (product: MobilyProduct) => {
      if (Platform.OS === 'ios' && product?.oneTime?.isMultiQuantity) {
        await DialogManager().push(PurchaseMultiQuantityProductDialog, { product }).waitIgnoreCancel();
      } else {
        await purchaseProduct(product);
      }
    },
    [purchaseProduct],
  );

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Box flex={1} mt={20}>
      <Box alignItems="center" gap={5}>
        <Text>One-Time</Text>
        {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
      </Box>

      <ScrollView style={{ alignSelf: 'stretch', marginTop: 20, flex: 1 }}>
        <Box alignItems="stretch" alignSelf="stretch" gap={10} p={10}>
          {products?.map((product) => (
            <Box key={product.id} gap={1}>
              <ProductButton product={product} onPress={() => handlePurchase(product)} />
            </Box>
          ))}
        </Box>
      </ScrollView>
    </Box>
  );
};
