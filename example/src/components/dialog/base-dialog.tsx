import React from 'react';
import { Box } from '../uikit/Box';
import { Text } from '../uikit/text';
import { TouchableOpacity } from 'react-native';
import { MaterialDesignIcons as Icon } from '@react-native-vector-icons/material-design-icons';

export type BaseDialogProps = {
  onCancel: () => any;
  title: string | React.ReactNode;
  children?: any;
};

export const BaseDialog = (props: BaseDialogProps) => {
  const { title, onCancel, children } = props;

  return (
    <Box bgColor="white" borderColor="black" borderWidth={1} mx={20} style={{ maxWidth: 500 }}>
      <Box
        bgColor="#E6CC00"
        py={10}
        px={50}
        justifyContent="center"
        alignItems="center"
        style={{ position: 'relative' }}>
        {typeof title === 'string' ? <Text>{title}</Text> : title}
        <TouchableOpacity onPress={onCancel} style={{ position: 'absolute', right: 10 }}>
          <Icon name="close" size={24} color="black" />
        </TouchableOpacity>
      </Box>
      <Box>{children}</Box>
    </Box>
  );
};
