import { Box } from '../../components/uikit/Box';
import { Text } from '../../components/uikit/text';
import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { EntitlementView } from '../../components/entitlement-view';
import { Button } from '../../components/button';
import { useMobilyflowRefresh } from '../../services/use-mobilyflow-refresh';
import { MobilyPurchaseSDK } from 'mobilyflow-react-native-sdk';

export const EntitlementsScreen = () => {
  const {
    data: entitlements,
    error: entitlementsError,
    isFetching: isLoadingEntitlements,
  } = useQuery({
    queryKey: ['mobilyflow', 'entitlements'],
    queryFn: async () => {
      console.log('[Mobilyflow] getEntitlements');
      return await MobilyPurchaseSDK.getEntitlements();
    },
    staleTime: 0,
  });

  const {
    data: externalEntitlements,
    error: externalEntitlementsError,
    isFetching: isLoadingExternalEntitlements,
  } = useQuery({
    queryKey: ['mobilyflow', 'external-entitlements'],
    queryFn: async () => {
      return await MobilyPurchaseSDK.getExternalEntitlements();
    },
    staleTime: 0,
  });

  const handleRefresh = useMobilyflowRefresh();

  const error = entitlementsError || externalEntitlementsError;
  const isLoading = isLoadingEntitlements || isLoadingExternalEntitlements;

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Box flex={1} mt={20}>
      <Box alignItems="center" gap={5}>
        <Text textAlign="center">Entitlements</Text>
        {error && (
          <Text textAlign="center" style={{ color: 'red' }}>
            {error.message}
          </Text>
        )}
      </Box>

      <ScrollView style={{ alignSelf: 'stretch', marginTop: 20, flex: 1 }}>
        <Box alignItems="stretch" alignSelf="stretch" gap={10} p={10}>
          {entitlements?.map((entitlement) => (
            <EntitlementView key={entitlement.Product.id} entitlement={entitlement} />
          ))}
        </Box>
        {externalEntitlements.length > 0 && (
          <Box mx={30}>
            <Text style={{ fontWeight: 'bold', fontSize: 15, textDecorationLine: 'underline', paddingBottom: 10 }}>
              External entitlements:
            </Text>
            {externalEntitlements.map((x) => (
              <Text key={x.Product.identifier}> - {x.Product.identifier}</Text>
            ))}
          </Box>
        )}
        <Box gap={10} mt={30} mx={20} mb={20} style={{ maxWidth: 500 }}>
          <Button title="Refresh" onPress={handleRefresh} />
          <Button title="Manage subscriptions" onPress={() => MobilyPurchaseSDK.openManageSubscription()} />
        </Box>
      </ScrollView>
    </Box>
  );
};
