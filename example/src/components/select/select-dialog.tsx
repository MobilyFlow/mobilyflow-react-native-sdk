import { DialogComponent } from '@react-stateless-dialog/core';
import { Box } from '../uikit/Box';
import { Text } from '../uikit/text';
import { FlatList, TouchableOpacity } from 'react-native';
import { BaseDialog } from '../dialog/base-dialog';

export type SelectDialogArgs = {
  data: { label: string; value: any }[];
};

export const SelectDialog: DialogComponent<SelectDialogArgs, any> = (props) => {
  const { args, onConfirm, onCancel } = props;
  const { data } = args;

  return (
    <BaseDialog title="Selection" onCancel={onCancel}>
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
    </BaseDialog>
  );
};

SelectDialog.horizontal = 'stretch';
SelectDialog.vertical = 'center';
