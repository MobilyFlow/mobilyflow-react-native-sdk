import { DialogComponent } from '@react-stateless-dialog/core';
import { Box } from '../uikit/Box';
import { MobilyProduct } from 'mobilyflow-react-native-sdk';
import { BaseDialog } from './base-dialog';
import { ProductButton } from '../product-button';
import { ScrollView } from 'react-native';
import { usePurchaseProduct } from '../../services/use-purchase-product';
import { useCallback } from 'react';

export type PurchaseSubscriptionDialogArgs = {
  product: MobilyProduct;
};

export const PurchaseMultiQuantityProductDialog: DialogComponent<PurchaseSubscriptionDialogArgs, null> = (props) => {
  const { args, onCancel } = props;
  const { product } = args;

  const purchaseProduct = usePurchaseProduct();
  const handlePurchase = useCallback(
    async (quantity?: number) => {
      onCancel();
      requestAnimationFrame(async () => {
        await purchaseProduct(product, { quantity });
      });
    },
    [purchaseProduct, product, onCancel],
  );

  return (
    <BaseDialog title={product.identifier} onCancel={onCancel}>
      <Box h={Math.min(350)}>
        <ScrollView>
          <Box p={20} gap={10}>
            <ProductButton product={product} onPress={handlePurchase} />
            <Box gap={10} px={20}>
              {[2, 3].map((quantity) => (
                <ProductButton
                  key={quantity}
                  product={product}
                  quantity={quantity}
                  onPress={() => handlePurchase(quantity)}
                />
              ))}
            </Box>
          </Box>
        </ScrollView>
      </Box>
    </BaseDialog>
  );
};

PurchaseMultiQuantityProductDialog.horizontal = 'stretch';
PurchaseMultiQuantityProductDialog.vertical = 'center';
