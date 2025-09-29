import { Box } from './uikit/Box';
import { Text } from './uikit/text';

export const AppProgress = () => {
  return (
    <Box
      w="100%"
      h="100%"
      justifyContent="center"
      alignItems="center"
      bgColor="white"
      borderWidth={1}
      borderColor="black">
      <Text>Loading...</Text>
    </Box>
  );
};
