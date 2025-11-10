import { Box } from '../../components/uikit/Box';
import { Text } from '../../components/uikit/text';
import { MobilyProductType } from 'mobilyflow-react-native-sdk';
import { useQuery } from '@tanstack/react-query';
import { MobilyFlowService } from '../../services/mobilyflow-service';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { ProductButton } from '../../components/product-button';

export const OneTimeScreen = () => {
  const {
    data,
    error,
    isFetching: isLoading,
  } = useQuery({
    queryKey: ['mobilyflow', 'products'],
    queryFn: async () => {
      console.log('[Mobilyflow] getProducts');
      const result = await MobilyFlowService.getSDK().getProducts();
      console.log('[Mobilyflow] getProducts done');
      return result;
    },
  });

  const products = data?.filter((x) => x.type === MobilyProductType.ONE_TIME);

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
        <Text>One-Time</Text>
        {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
      </Box>

      <ScrollView style={{ alignSelf: 'stretch', marginTop: 20, flex: 1 }}>
        <Box alignItems="stretch" alignSelf="stretch" gap={10} p={10}>
          {products?.map((product) => (
            <Box key={product.id} gap={1}>
              <ProductButton product={product} />
            </Box>
          ))}
        </Box>
      </ScrollView>
    </Box>
  );
};
