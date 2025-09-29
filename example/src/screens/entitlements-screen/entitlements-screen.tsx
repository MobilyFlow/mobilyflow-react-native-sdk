import { Box } from '../../components/uikit/Box';
import { Text } from '../../components/uikit/text';
import { useQuery } from '@tanstack/react-query';
import { MobilyFlowService } from '../../services/mobilyflow-service';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { EntitlementView } from '../../components/entitlement-view';
import { Button } from '../../components/button';
import { useMobilyflowRefresh } from '../../services/use-mobilyflow-refresh';

export const EntitlementsScreen = () => {
  const {
    data: entitlements,
    error,
    isFetching: isLoading,
  } = useQuery({
    queryKey: ['mobilyflow', 'entitlements'],
    queryFn: async () => {
      return await MobilyFlowService.getSDK().getEntitlements();
    },
  });

  const handleRefresh = useMobilyflowRefresh();

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
        <Text>Entitlements</Text>
        {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
      </Box>

      <ScrollView style={{ alignSelf: 'stretch', marginTop: 20, flex: 1 }}>
        <Box alignItems="stretch" alignSelf="stretch" gap={10} p={10}>
          {entitlements?.map((entitlement) => (
            <EntitlementView key={entitlement.product.id} entitlement={entitlement} />
          ))}
        </Box>
        <Box gap={10} mt={30} mx={20} mb={20} style={{ maxWidth: 500 }}>
          <Button title="Refresh" onPress={handleRefresh} />
          <Button title="Manage subscriptions" onPress={() => MobilyFlowService.getSDK().openManageSubscription()} />
        </Box>
      </ScrollView>
    </Box>
  );
};
