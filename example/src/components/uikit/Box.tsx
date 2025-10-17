import { useMemo } from 'react';
import { removeUndefined } from '../../utils/utils';
import { StyleProp, View, ViewProps, ViewStyle } from 'react-native';

export type BoxProps = ViewProps & {
  // Padding
  p?: number;
  px?: number;
  py?: number;
  pl?: number;
  pt?: number;
  pr?: number;
  pb?: number;

  // Margin
  m?: number;
  mx?: number;
  my?: number;
  ml?: number;
  mt?: number;
  mr?: number;
  mb?: number;

  // Other style
  bgColor?: ViewStyle['backgroundColor'];
  borderRadius?: ViewStyle['borderRadius'];
  borderColor?: ViewStyle['borderColor'];
  borderWidth?: ViewStyle['borderWidth'];
  w?: ViewStyle['width'];
  h?: ViewStyle['height'];

  flex?: ViewStyle['flex'];
  flexDirection?: ViewStyle['flexDirection'];
  flexGrow?: ViewStyle['flexGrow'];

  // Alignment on main axis
  justifyContent?: ViewStyle['justifyContent'];
  // Alignment on secondary axis
  alignItems?: ViewStyle['alignItems'];
  alignSelf?: ViewStyle['alignSelf'];

  gap?: ViewStyle['gap'];
  columnGap?: ViewStyle['columnGap'];
  rowGap?: ViewStyle['rowGap'];

  opacity?: ViewStyle['opacity'];
};

export const Box = (props: BoxProps) => {
  const {
    // Margin & Padding
    m,
    mb,
    ml,
    mr,
    mt,
    mx,
    my,
    p,
    pb,
    pl,
    pr,
    pt,
    px,
    py,

    // Fast access style
    bgColor,
    borderRadius,
    borderColor,
    borderWidth,
    w,
    h,

    flex,
    flexDirection,
    flexGrow,

    justifyContent,
    alignItems,
    alignSelf,

    gap,
    rowGap,
    columnGap,

    opacity,

    // Others
    style,
    ...others
  } = props;

  const boxStyle = useMemo<StyleProp<ViewStyle>>(
    () =>
      removeUndefined({
        margin: m,
        marginHorizontal: mx,
        marginVertical: my,
        marginTop: mt,
        marginBottom: mb,
        marginLeft: ml,
        marginRight: mr,

        padding: p,
        paddingHorizontal: px,
        paddingVertical: py,
        paddingTop: pt,
        paddingBottom: pb,
        paddingLeft: pl,
        paddingRight: pr,

        backgroundColor: bgColor,
        borderRadius,
        borderColor,
        borderWidth,
        width: w,
        height: h,

        flex,
        flexDirection,
        flexGrow,
        justifyContent,
        alignItems,
        alignSelf,

        gap,
        rowGap,
        columnGap,

        opacity,
      }),
    [
      m,
      mx,
      my,
      mt,
      mb,
      ml,
      mr,
      p,
      px,
      py,
      pt,
      pb,
      pl,
      pr,
      bgColor,
      borderRadius,
      borderColor,
      borderWidth,
      w,
      h,
      flex,
      flexDirection,
      flexGrow,
      justifyContent,
      alignItems,
      alignSelf,
      gap,
      rowGap,
      columnGap,
      opacity,
    ],
  );

  return <View style={[boxStyle, style]} {...others} />;
};
