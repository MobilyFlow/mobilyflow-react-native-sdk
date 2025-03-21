import type { MobilyProduct } from '../../src/entities/mobily-product';
import { Text, TouchableOpacity, View } from 'react-native';
import type { MobilySubscriptionOffer } from '../../src/entities/mobily-subscription-offer';
import { ProductStatus } from '../../src/enums/product-status';

export type ProductButtonProps = {
  product: MobilyProduct;
  offer?: MobilySubscriptionOffer;
  handlePress: (product: MobilyProduct, offer?: MobilySubscriptionOffer) => any;
};

export const ProductButton = (props: ProductButtonProps) => {
  const { product, handlePress } = props;
  const offer = props.offer ?? product?.subscriptionProduct?.baseOffer;

  return (
    <TouchableOpacity
      onPress={() => handlePress(product, offer)}
      style={{
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
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
      <Text>{product.name}</Text>
      <Text>{product.description}</Text>
      <Text>
        {offer?.priceFormatted ??
          product.oneTimeProduct?.priceFormatted ??
          product.subscriptionProduct?.baseOffer.priceFormatted ??
          '-'}
      </Text>
      {offer?.id && <Text>Offer: {offer.ios_offerId}</Text>}
    </TouchableOpacity>
  );
};
