import { Box } from '../../components/uikit/Box';
import { Text } from '../../components/uikit/text';
import { Select } from '../../components/select/select';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { MobilyEnvironment } from 'mobilyflow-react-native-sdk';
import { Button } from '../../components/button';
import { ActivityIndicator, Platform, ScrollView } from 'react-native';
import { useMobilyflowParams } from '../../services/use-mobilyflow-params';
import { MobilyFlowService } from '../../services/mobilyflow-service';
import { useMobilyflowStore } from '../../stores/mobilyflow-store';
import { getMobilyflowErrorLabel } from '../../utils/utils';
import { useMobilyflowRefresh } from '../../services/use-mobilyflow-refresh';

export const HomeScreen = () => {
  const { customerId, environment, apiUrl } = useMobilyflowParams();

  const [storeCountry, setStoreCountry] = useState<string>();
  const [mobilyflowCustomerId, setMobilyFlowCustomerId] = useState<string>();

  const isMobilyflowLoading = useMobilyflowStore((state) => state.isLoading);
  const mobilyflowError = useMobilyflowStore((state) => state.error);
  const errorLabel = useMemo(() => getMobilyflowErrorLabel(mobilyflowError), [mobilyflowError]);

  useEffect(() => {
    if (!isMobilyflowLoading) {
      (async () => {
        setStoreCountry(Platform.OS === 'ios' ? await MobilyFlowService.getSDK().getStoreCountry() : '-');
        setMobilyFlowCustomerId((await MobilyFlowService.getSDK().getCustomer())?.id);
      })();

      MobilyFlowService.addCustomerChangeListener((customer) => {
        setMobilyFlowCustomerId(customer?.id);
      });
    }
  }, [isMobilyflowLoading, errorLabel]);

  const handleRefresh = useMobilyflowRefresh();

  const handleManageSubscriptions = useCallback(async () => {
    await MobilyFlowService.getSDK().openManageSubscription();
  }, []);

  const handleTransferOwnership = useCallback(async () => {
    await MobilyFlowService.getSDK().requestTransferOwnership();
  }, []);

  const handleSendDiagnostic = useCallback(() => {
    MobilyFlowService.getSDK().sendDiagnostic();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Box flex={1} p={20} mb={20}>
        <Box gap={10} flex={1}>
          <Box>
            <Text>Customer</Text>
            <Select
              placeholder="Customer"
              data={[
                { label: 'gregoire', value: 'gregoire' },
                { label: 'gregoire-ios', value: 'gregoire-ios' },
                { label: 'gregoire-android', value: 'gregoire-android' },
              ]}
              value={customerId}
              onChange={MobilyFlowService.setCustomerId}
            />
          </Box>
          <Box>
            <Text>Environment</Text>
            <Select
              placeholder="Environment"
              data={[
                { label: 'development', value: MobilyEnvironment.DEVELOPMENT },
                { label: 'staging', value: MobilyEnvironment.STAGING },
                { label: 'production', value: MobilyEnvironment.PRODUCTION },
              ]}
              value={environment}
              onChange={MobilyFlowService.setEnvironment}
            />
          </Box>
          <Box>
            <Text>MobilyFlow API URL</Text>
            <Select
              placeholder="https://api.mobilyflow.com/v1/"
              data={[
                { label: 'production', value: null },
                { label: 'https://api-staging.mobilyflow.com/v1/', value: 'https://api-staging.mobilyflow.com/v1/' },
                {
                  label: 'https://mobilyflow.eu-1.sharedwithexpose.com/v1/',
                  value: 'https://mobilyflow.eu-1.sharedwithexpose.com/v1/',
                },
              ]}
              value={apiUrl}
              onChange={MobilyFlowService.setApiURL}
            />
          </Box>
          <Box alignItems="center" mt={10} gap={5}>
            {isMobilyflowLoading ? (
              <ActivityIndicator size="large" />
            ) : (
              <>
                <Text textAlign="center">MobilyFlow Customer: {mobilyflowCustomerId}</Text>
                <Text>Country: {storeCountry}</Text>
                {errorLabel && <Text color="red">{errorLabel}</Text>}
              </>
            )}
          </Box>
        </Box>
        <Box gap={10} mt={50} style={{ maxWidth: 500 }}>
          <Button title="Refresh" onPress={handleRefresh} />
          <Button title="Manage subscriptions" onPress={handleManageSubscriptions} />
          <Button title="Transfer Ownership" onPress={handleTransferOwnership} />
          <Button title="Send diagnostic" onPress={handleSendDiagnostic} />
        </Box>
      </Box>
    </ScrollView>
  );
};
