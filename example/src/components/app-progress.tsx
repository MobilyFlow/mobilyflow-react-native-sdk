import { Box } from './uikit/Box';
import { Text } from './uikit/text';
import { ActivityIndicator } from 'react-native';
import { ProgressComponentProps } from '@react-stateless-dialog/core/src/progress-manager/models/progress-component';

export const AppProgress = (props: ProgressComponentProps) => {
  const { message } = props;

  return (
    <Box
      w="100%"
      h="100%"
      justifyContent="center"
      alignItems="center"
      bgColor="white"
      borderWidth={1}
      borderColor="black"
      gap={10}>
      <ActivityIndicator size="large" />
      <Text>{message ?? 'Loading...'}</Text>
    </Box>
  );
};
