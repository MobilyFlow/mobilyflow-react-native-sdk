import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { TouchableOpacity } from 'react-native';

export type IconButtonProps = {
  icon: string;
  onPress?: () => any;
};

export const IconButton = (props: IconButtonProps) => {
  const { icon, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress} style={{ borderWidth: 1, borderColor: 'black', borderRadius: 8, padding: 10 }}>
      <MaterialDesignIcons name={icon as any} size={26} color="black" />
    </TouchableOpacity>
  );
};
