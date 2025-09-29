import { Platform, Text } from 'react-native';
import { MobilyCustomerEntitlement, ProductType } from 'mobilyflow-react-native-sdk';
import { Box } from './uikit/Box';
import { HStack } from './uikit/HStack';
import { IconButton } from './icon-button';
import { formatDate } from '../utils/utils';
import { useCallback } from 'react';

export type EntitlementViewProps = {
  entitlement: MobilyCustomerEntitlement;
};

export const EntitlementView = (props: EntitlementViewProps) => {
  const { entitlement } = props;
  const product = entitlement.product;

  const handleRefund = useCallback(async () => {
    // TODO: Get last transaction and refund it (iOS only)
    // entitlement.subscription
  }, []);

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
            <Text>Last Paid Price: TODO</Text>
            <Text>RenewPrice: TODO</Text>
            <Text>RegularPrice: TODO</Text>
            <Text>Offer + Remaining Cycle: TODO</Text>
          </>
        )}
        <HStack gap={5} mt={10}>
          {Platform.OS === 'ios' && <IconButton icon="credit-card-refund-outline" onPress={handleRefund} />}
        </HStack>
      </Box>
    </Box>
  );
};
