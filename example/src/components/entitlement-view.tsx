import { Platform, Text, TouchableOpacity } from 'react-native';
import { MobilyCustomerEntitlement, MobilyProductType } from 'mobilyflow-react-native-sdk';
import { Box } from './uikit/Box';
import { HStack } from './uikit/HStack';
import { IconButton } from './icon-button';
import { formatDate, formatPriceMillis } from '../utils/utils';
import { useCallback } from 'react';
import { MobilyFlowService } from '../services/mobilyflow-service';
import { usePurchaseProduct } from '../services/use-purchase-product';

export type EntitlementViewProps = {
  entitlement: MobilyCustomerEntitlement;
};

export const EntitlementView = (props: EntitlementViewProps) => {
  const { entitlement } = props;
  const product = entitlement.Product;

  const handleRefund = useCallback(async () => {
    await MobilyFlowService.getSDK().openRefundDialogForProduct(product);
  }, [product]);

  const purchaseProduct = usePurchaseProduct();

  const handleCancelEvolution = useCallback(async () => {
    await purchaseProduct(entitlement.Product);
  }, [purchaseProduct, entitlement]);

  return (
    <Box
      style={{
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8,
        justifyContent: 'center',
      }}>
      <Box
        p={10}
        bgColor="#dddddd"
        style={{ borderBottomWidth: 1, borderBottomColor: 'black', borderTopEndRadius: 8, borderTopStartRadius: 8 }}>
        <Text>{product.identifier}</Text>
      </Box>
      <Box p={10} gap={5}>
        <Text>Type: {entitlement.type}</Text>
        {entitlement.type === MobilyProductType.ONE_TIME ? (
          <>
            <Text>Quantity: {entitlement.Item.quantity}</Text>
          </>
        ) : (
          <>
            <Text>Start Date: {formatDate(entitlement.Subscription.startDate)}</Text>
            <Text>End Date: {formatDate(entitlement.Subscription.endDate)}</Text>
            <Text>Auto Renew: {entitlement.Subscription.autoRenewEnable ? '✅' : '❌'}</Text>
            <Text>Managed Here: {entitlement.Subscription.isManagedByThisStoreAccount ? '✅' : '❌'}</Text>
            {entitlement.Subscription.hasPauseScheduled && (
              <Text>Has Pause: ✅ (resume: {formatDate(entitlement.Subscription.resumeDate)})</Text>
            )}
            {entitlement.Subscription.ProductOffer && (
              <Text>Offer: {entitlement.Subscription.ProductOffer.identifier}</Text>
            )}
            {!!entitlement.Subscription.offerRemainingCycle && (
              <Text>Offer Remaining Cycle: {entitlement.Subscription.offerRemainingCycle}</Text>
            )}
            {entitlement.Subscription.RenewProduct?.identifier && (
              <Text>
                Renew To: {entitlement.Subscription.RenewProduct?.identifier}
                {entitlement.Subscription.RenewProductOffer &&
                  ` (${entitlement.Subscription.RenewProductOffer.identifier})`}
              </Text>
            )}
            <Text>
              Last Paid Price:{' '}
              {formatPriceMillis(entitlement.Subscription.lastPriceMillis, entitlement.Subscription.currency)}
            </Text>
            <Text>
              Renew Price:{' '}
              {formatPriceMillis(entitlement.Subscription.renewPriceMillis, entitlement.Subscription.currency)}
            </Text>
            <Text>
              Regular Price:{' '}
              {formatPriceMillis(entitlement.Subscription.regularPriceMillis, entitlement.Subscription.currency)}
            </Text>
            {Platform.OS === 'ios' && <Text>iOS Group ID: {entitlement.Product.subscription.ios_groupId}</Text>}
            {entitlement.Subscription.RenewProduct && (
              <Box alignItems="center" mt={10}>
                <TouchableOpacity onPress={handleCancelEvolution}>
                  <Text style={{ textDecorationLine: 'underline' }}>Cancel Evolution</Text>
                </TouchableOpacity>
              </Box>
            )}
          </>
        )}
        <HStack gap={5} mt={10}>
          {Platform.OS === 'ios' &&
            (product.type === MobilyProductType.SUBSCRIPTION || !product.oneTime.isConsumable) && (
              <IconButton icon="credit-card-refund-outline" onPress={handleRefund} />
            )}
        </HStack>
      </Box>
    </Box>
  );
};
