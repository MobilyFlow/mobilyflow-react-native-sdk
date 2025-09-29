import { MobilyProduct, type MobilySubscriptionOffer, WebhookStatus } from 'mobilyflow-react-native-sdk';
import { useCallback } from 'react';
import { MobilyFlowService } from './mobilyflow-service';
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
        const result = await MobilyFlowService.getSDK().purchaseProduct(product, { offer, quantity });
        console.log('Purchase result = ', WebhookStatus[result]);
        await queryClient.invalidateQueries({ queryKey: ['mobilyflow', 'entitlements'] });
        ProgressManager().hide();
        await DialogManager().push(PurchaseResultDialog, { status: result }).waitIgnoreCancel();
      } catch (error: any) {
        ProgressManager().hide();
        await DialogManager().push(PurchaseResultDialog, { status: WebhookStatus.ERROR, error }).waitIgnoreCancel();
      }
    },
    [queryClient],
  );
};
