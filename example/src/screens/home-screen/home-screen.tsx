import { Box } from '../../components/uikit/Box';
import { Text } from '../../components/uikit/text';
import { Select } from '../../components/select/select';
import { useCallback, useState } from 'react';
import { MobilyEnvironment } from 'mobilyflow-react-native-sdk';
import { Button } from '../../components/button';
import { ScrollView } from 'react-native';

export const HomeScreen = () => {
  const [customerId, setCustomerId] = useState('');
  const [environment, setEnvironment] = useState(MobilyEnvironment.DEVELOPMENT);
  const [apiUrl, setApiUrl] = useState<string>(null);

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
              onChange={setCustomerId}
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
              onChange={setEnvironment}
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
              onChange={setApiUrl}
            />
          </Box>
        </Box>
        <Box gap={10} mx={50} mt={50}>
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
