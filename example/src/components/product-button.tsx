import { Text, TouchableOpacity, View } from 'react-native';
import { MobilyProduct, MobilyProductStatus, MobilySubscriptionOffer } from 'mobilyflow-react-native-sdk';
import { usePurchaseProduct } from '../services/use-purchase-product';
import { useCallback } from 'react';

export type ProductButtonProps = {
  product: MobilyProduct;
  offer?: MobilySubscriptionOffer;
  quantity?: number;
  onPress?: () => any;
};

export const ProductButton = (props: ProductButtonProps) => {
  const { product, quantity, onPress, offer } = props;

  const purchaseProduct = usePurchaseProduct();
  const effectiveOffer = offer ?? product.subscription?.introductoryOffer;

  const handlePress = useCallback(async () => {
    if (onPress) {
      onPress();
    } else {
      await purchaseProduct(product, { offer, quantity });
    }
  }, [onPress, product, offer, quantity, purchaseProduct]);

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          position: 'absolute',
          top: 5,
          right: 5,
          borderRadius: 20,
          height: 20,
          width: 20,
          backgroundColor: product.status === MobilyProductStatus.AVAILABLE ? 'green' : 'red',
        }}
      />
      <Text>
        {product.name}
        {quantity ? ` (${quantity})` : ''}
      </Text>
      <Text>{product.description}</Text>
      <Text>{product.identifier}</Text>
      <Text>{effectiveOffer?.priceFormatted ?? product.priceFormatted}</Text>
      {effectiveOffer && <Text>Offer: {effectiveOffer.identifier}</Text>}
      {effectiveOffer && <Text>{effectiveOffer.countBillingCycle} cycles</Text>}
    </TouchableOpacity>
  );
};
