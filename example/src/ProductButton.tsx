import type { MobilyProduct } from '../../src/entities/mobily-product';
import { Text, TouchableOpacity } from 'react-native';
import type { MobilySubscriptionOffer } from '../../src/entities/mobily-subscription-offer';

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
