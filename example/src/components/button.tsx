import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { Text } from './uikit/text';
import { StyleSheet } from 'react-native-unistyles';

export type ButtonProps = {
  title: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => any;
};

export const Button = (props: ButtonProps) => {
  const { title, style, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.touchable, style]} activeOpacity={0.5}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create(() => ({
  touchable: {
    borderWidth: 1,
    borderRadius: 100,
    paddingHorizontal: 20,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
  },
}));
