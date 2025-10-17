import { Box, BoxProps } from './Box';

export const HStack = (props: BoxProps) => {
  return <Box flexDirection="row" alignItems="center" {...props} />;
};
