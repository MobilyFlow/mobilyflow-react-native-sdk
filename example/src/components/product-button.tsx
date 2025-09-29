import { Text, TouchableOpacity, View } from 'react-native';
import { ProductStatus, MobilyProduct, MobilySubscriptionOffer } from 'mobilyflow-react-native-sdk';
import { usePurchaseProduct } from '../services/use-purchase-product';
import { useCallback } from 'react';

export type ProductButtonProps = {
  product: MobilyProduct;
  offer?: MobilySubscriptionOffer;
  quantity?: number;
  onPress?: () => any;
};

export const ProductButton = (props: ProductButtonProps) => {
  const { product, quantity, onPress } = props;
  const offer = props.offer ?? product?.subscriptionProduct?.baseOffer;

  const purchaseProduct = usePurchaseProduct();

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
          backgroundColor: product.status === ProductStatus.AVAILABLE ? 'green' : 'red',
        }}
      />
      <Text>
        {product.name}
        {quantity ? ` (${quantity})` : ''}
      </Text>
      <Text>{product.description}</Text>
      <Text>{product.identifier}</Text>
      <Text>
        {offer?.priceFormatted ??
          product.oneTimeProduct?.priceFormatted ??
          product.subscriptionProduct?.baseOffer.priceFormatted ??
          '-'}
      </Text>
      {offer?.id && <Text>Offer: {offer.identifier}</Text>}
    </TouchableOpacity>
  );
};
