import { useMemo } from 'react';
import { Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native';
import { removeUndefined } from '../../utils/utils';

export type TextProps = RNTextProps & {
  textAlign?: TextStyle['textAlign'];
  color?: TextStyle['color'];
  fontSize?: TextStyle['fontSize'];
  fontFamily?: TextStyle['fontFamily'];
  flex?: TextStyle['flex'];
  underline?: boolean;
};

export const Text = (props: TextProps) => {
  const { textAlign, color, fontSize, fontFamily, flex, underline, style, ...others } = props;

  const computedStyle = useMemo(
    () =>
      removeUndefined<TextStyle>({
        color,
        textAlign,
        fontSize,
        fontFamily,
        flex,
        textDecorationLine: underline ? 'underline' : undefined,
      }),
    [textAlign, color, fontSize, fontFamily, flex, underline],
  );

  return <RNText style={[computedStyle, style]} {...others} />;
};
