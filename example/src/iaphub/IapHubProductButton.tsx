import { Text, TouchableOpacity } from 'react-native';
import type Product from 'react-native-iaphub/lib/typescript/models/product';

export type IapHubProductButtonProps = {
  product: Product;
  handlePress: (product: Product) => any;
};

export const IapHubProductButton = (props: IapHubProductButtonProps) => {
  const { product, handlePress } = props;

  return (
    <TouchableOpacity
      onPress={() => handlePress(product)}
      style={{
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>{product.id}</Text>
      <Text>{product.sku}</Text>
      <Text>{product.localizedDescription}</Text>
      <Text>{product.localizedPrice}</Text>
    </TouchableOpacity>
  );
};
