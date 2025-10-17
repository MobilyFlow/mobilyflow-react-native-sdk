import { useMMKVNumber, useMMKVString } from 'react-native-mmkv';
import { MobilyFlowService } from './mobilyflow-service';
import { MobilyEnvironment } from 'mobilyflow-react-native-sdk';

export const useMobilyflowParams = () => {
  // eslint-disable-next-line dot-notation
  const storage = MobilyFlowService['storage'];

  const [customerId] = useMMKVString('customerId', storage);
  const [environment] = useMMKVNumber('environment', storage);
  const [apiUrl] = useMMKVString('apiURL', storage);

  return {
    customerId,
    apiUrl,
    environment: environment ?? MobilyEnvironment.DEVELOPMENT,
  };
};
