import { Box } from '../../components/uikit/Box';
import { Text } from '../../components/uikit/text';
import { Select } from '../../components/select/select';
import { useCallback, useEffect, useState } from 'react';
import { MobilyEnvironment } from 'mobilyflow-react-native-sdk';
import { Button } from '../../components/button';
import { Platform, ScrollView } from 'react-native';
import { useMobilyflowParams } from '../../services/use-mobilyflow-params';
import { MobilyFlowService } from '../../services/mobilyflow-service';

export const HomeScreen = () => {
  const { customerId, environment, apiUrl } = useMobilyflowParams();

  const [storeCountry, setStoreCountry] = useState<string>();
  const [mobilyflowCustomerId, setMobilyFlowCustomerId] = useState<string>();

  useEffect(() => {
    (async () => {
      setStoreCountry(Platform.OS === 'ios' ? await MobilyFlowService.getSDK().getStoreCountry() : '-');
      setMobilyFlowCustomerId((await MobilyFlowService.getSDK().getCustomer())?.id);
    })();

    MobilyFlowService.addCustomerChangeListener((customer) => {
      setMobilyFlowCustomerId(customer?.id);
    });
  });

  const handleRefresh = useCallback(async () => {}, []);
  const handleManageSubscriptions = useCallback(async () => {}, []);
  const handleTransferOwnership = useCallback(async () => {}, []);
  const handleSendDiagnostic = useCallback(async () => {}, []);
  const handleRefundRequest = useCallback(async () => {}, []);

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
            <Text textAlign="center">MobilyFlow Customer: {mobilyflowCustomerId}</Text>
            <Text>Country: {storeCountry}</Text>
          </Box>
        </Box>
        <Box gap={10} mt={50} style={{ maxWidth: 500 }}>
          <Button title="Refresh" onPress={handleRefresh} />
          <Button title="Manage subscriptions" onPress={handleManageSubscriptions} />
          <Button title="Transfer Ownership" onPress={handleTransferOwnership} />
          <Button title="Send diagnostic" onPress={handleSendDiagnostic} />
          <Button title="Refund Request" onPress={handleRefundRequest} />
        </Box>
      </Box>
    </ScrollView>
  );
};
