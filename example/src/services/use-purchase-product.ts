import {
  MobilyProduct,
  MobilyPurchaseSDK,
  type MobilySubscriptionOffer,
  MobilyWebhookStatus,
} from 'mobilyflow-react-native-sdk';
import { useCallback } from 'react';
import { DialogManager, ProgressManager } from '@react-stateless-dialog/core';
import { PurchaseResultDialog } from '../components/dialog/purchase-result-dialog';
import { useQueryClient } from '@tanstack/react-query';

export const usePurchaseProduct = () => {
  const queryClient = useQueryClient();
  return useCallback(
    async (product: MobilyProduct, options: { offer?: MobilySubscriptionOffer; quantity?: number } = {}) => {
      const { offer, quantity } = options;

      try {
        console.log(`Purchase ${product.identifier} ${offer?.ios_offerId}`);
        ProgressManager().show();
        const result = await MobilyPurchaseSDK.purchaseProduct(product, { offer, quantity });
        console.log('Purchase result = ', result);
        await queryClient.invalidateQueries({ queryKey: ['mobilyflow', 'entitlements'] });
        ProgressManager().hide();
        await DialogManager().push(PurchaseResultDialog, { status: MobilyWebhookStatus.SUCCESS }).waitIgnoreCancel();
      } catch (error: any) {
        ProgressManager().hide();
        await DialogManager()
          .push(PurchaseResultDialog, { status: MobilyWebhookStatus.ERROR, error })
          .waitIgnoreCancel();
      }
    },
    [queryClient],
  );
};
