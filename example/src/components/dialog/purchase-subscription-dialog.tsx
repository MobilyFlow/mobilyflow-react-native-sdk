import { DialogComponent } from '@react-stateless-dialog/core';
import { Box } from '../uikit/Box';
import { MobilyProduct, MobilySubscriptionOffer } from 'mobilyflow-react-native-sdk';
import { BaseDialog } from './base-dialog';
import { ProductButton } from '../product-button';
import { ScrollView } from 'react-native';
import { usePurchaseProduct } from '../../services/use-purchase-product';
import { useCallback } from 'react';

export type PurchaseSubscriptionDialogArgs = {
  product: MobilyProduct;
};

export const PurchaseSubscriptionDialog: DialogComponent<PurchaseSubscriptionDialogArgs, null> = (props) => {
  const { args, onCancel } = props;
  const { product } = args;

  const purchaseProduct = usePurchaseProduct();
  const handlePurchase = useCallback(
    async (offer?: MobilySubscriptionOffer) => {
      onCancel();
      requestAnimationFrame(async () => {
        await purchaseProduct(product, { offer });
      });
    },
    [purchaseProduct, product, onCancel],
  );

  return (
    <BaseDialog title={product.identifier} onCancel={onCancel}>
      <ScrollView>
        <Box h={300} p={20} gap={10}>
          <ProductButton product={product} onPress={handlePurchase} />
          {product?.subscriptionProduct?.promotionalOffers?.length > 0 && (
            <Box gap={10} px={20}>
              {product?.subscriptionProduct?.promotionalOffers?.map((offer) => (
                <ProductButton key={offer.id} product={product} offer={offer} onPress={() => handlePurchase(offer)} />
              ))}
            </Box>
          )}
        </Box>
      </ScrollView>
    </BaseDialog>
  );
};

PurchaseSubscriptionDialog.horizontal = 'stretch';
PurchaseSubscriptionDialog.vertical = 'center';
