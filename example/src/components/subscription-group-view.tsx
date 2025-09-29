import { MobilyProduct, MobilySubscriptionGroup } from 'mobilyflow-react-native-sdk';
import { Box } from './uikit/Box';
import { Text } from './uikit/text';
import { TouchableOpacity } from 'react-native';
import { useCallback, useState } from 'react';
import { ProductButton } from '../ProductButton';
import { DialogManager } from '@react-stateless-dialog/core';
import { PurchaseSubscriptionDialog } from './dialog/purchase-subscription-dialog';
import { usePurchaseProduct } from '../services/use-purchase-product';

type SubscriptionGroupViewProps = {
  group: MobilySubscriptionGroup;
};

export const SubscriptionGroupView = (props: SubscriptionGroupViewProps) => {
  const { group } = props;

  const [isOpen, setOpen] = useState(false);

  const handlePressGroup = useCallback(() => {
    setOpen((old) => !old);
  }, []);

  const purchaseProduct = usePurchaseProduct();
  const handlePurchase = useCallback(
    async (product: MobilyProduct) => {
      if (product?.subscriptionProduct?.promotionalOffers?.length > 0) {
        await DialogManager().push(PurchaseSubscriptionDialog, { product }).waitIgnoreCancel();
      } else {
        console.log('Purchase product', product);
        await purchaseProduct(product);
      }
    },
    [purchaseProduct],
  );

  return (
    <Box borderColor="black" borderRadius={8} borderWidth={1}>
      <TouchableOpacity onPress={handlePressGroup}>
        <Box
          p={5}
          bgColor="#dddddd"
          style={[
            isOpen
              ? { borderBottomWidth: 1, borderBottomColor: 'black', borderTopEndRadius: 8, borderTopStartRadius: 8 }
              : { borderRadius: 8 },
          ]}>
          <Text textAlign="center">{group.identifier}</Text>
          <Text textAlign="center">{group.name}</Text>
          <Text textAlign="center">{group.description}</Text>
        </Box>
      </TouchableOpacity>
      {isOpen && (
        <Box gap={10} p={10}>
          {group.products?.map((product) => (
            <Box key={product.id} gap={1}>
              <ProductButton product={product} onPress={() => handlePurchase(product)} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
