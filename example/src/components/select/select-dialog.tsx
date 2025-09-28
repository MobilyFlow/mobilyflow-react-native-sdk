import { DialogComponent } from '@react-stateless-dialog/core';
import { Box } from '../uikit/Box';
import { Text } from '../uikit/text';
import { FlatList, TouchableOpacity } from 'react-native';
import { MaterialDesignIcons as Icon } from '@react-native-vector-icons/material-design-icons';

export type SelectDialogArgs = {
  data: { label: string; value: any }[];
};

export const SelectDialog: DialogComponent<SelectDialogArgs, any> = (props) => {
  const { args, onConfirm, onCancel } = props;
  const { data } = args;

  return (
    <Box bgColor="white" borderColor="black" borderWidth={1} mx={100}>
      <Box
        bgColor="#E6CC00"
        py={10}
        px={50}
        justifyContent="center"
        alignItems="center"
        style={{ position: 'relative' }}>
        <Text>Selection</Text>
        <TouchableOpacity onPress={onCancel} style={{ position: 'absolute', right: 10 }}>
          <Icon name="close" size={24} color="black" />
        </TouchableOpacity>
      </Box>
      <Box style={{ height: 300 }}>
        <FlatList
          keyExtractor={(item) => item.value}
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onConfirm(item.value)}>
              <Box p={10} style={{ borderBottomWidth: 1, borderBottomColor: 'black' }}>
                <Text>{item.label}</Text>
              </Box>
            </TouchableOpacity>
          )}
        />
      </Box>
    </Box>
  );
};

SelectDialog.horizontal = 'stretch';
SelectDialog.vertical = 'center';
