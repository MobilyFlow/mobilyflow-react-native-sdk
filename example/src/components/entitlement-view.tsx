import { Platform, Text } from 'react-native';
import { MobilyCustomerEntitlement, ProductType } from 'mobilyflow-react-native-sdk';
import { Box } from './uikit/Box';
import { HStack } from './uikit/HStack';
import { IconButton } from './icon-button';
import { formatDate, formatPriceMillis } from '../utils/utils';
import { useCallback } from 'react';
import { MobilyFlowService } from '../services/mobilyflow-service';

export type EntitlementViewProps = {
  entitlement: MobilyCustomerEntitlement;
};

export const EntitlementView = (props: EntitlementViewProps) => {
  const { entitlement } = props;
  const product = entitlement.product;

  const handleRefund = useCallback(async () => {
    await MobilyFlowService.getSDK().openRefundDialog(product);
  }, [product]);

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
        <Text>Type: {ProductType[entitlement.type]}</Text>
        {entitlement.type === ProductType.ONE_TIME ? (
          <>
            <Text>Quantity: {entitlement.item.quantity}</Text>
          </>
        ) : (
          <>
            <Text>Start Date: {formatDate(entitlement.subscription.startDate)}</Text>
            <Text>End Date: {formatDate(entitlement.subscription.endDate)}</Text>
            <Text>Auto Renew: {entitlement.subscription.autoRenewEnable ? '✅' : '❌'}</Text>
            <Text>Managed Here: {entitlement.subscription.isManagedByThisStoreAccount ? '✅' : '❌'}</Text>
            <Text>
              Last Paid Price:{' '}
              {formatPriceMillis(entitlement.subscription.lastPriceMillis, entitlement.subscription.currency)}
            </Text>
            <Text>
              Renew Price:{' '}
              {formatPriceMillis(entitlement.subscription.renewPriceMillis, entitlement.subscription.currency)}
            </Text>
            {entitlement.subscription.renewProduct?.identifier && (
              <Text>
                Renew To: {entitlement.subscription.renewProduct?.identifier}
                {entitlement.subscription.renewProductOffer &&
                  ` (${entitlement.subscription.renewProductOffer.identifier})`}
              </Text>
            )}
            <Text>
              Regular Price:{' '}
              {formatPriceMillis(entitlement.subscription.regularPriceMillis, entitlement.subscription.currency)}
            </Text>
            {!!entitlement.subscription.offerRemainingCycle && (
              <Text>Offer Remaining Cycle: {entitlement.subscription.offerRemainingCycle}</Text>
            )}
          </>
        )}
        <HStack gap={5} mt={10}>
          {Platform.OS === 'ios' &&
            (product.type === ProductType.SUBSCRIPTION || !product.oneTimeProduct.isConsumable) && (
              <IconButton icon="credit-card-refund-outline" onPress={handleRefund} />
            )}
        </HStack>
      </Box>
    </Box>
  );
};
