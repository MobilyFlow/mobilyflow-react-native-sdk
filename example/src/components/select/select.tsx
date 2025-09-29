import { HStack } from '../uikit/HStack';
import { Text } from '../uikit/text';
import { MaterialIcons as Icon } from '@react-native-vector-icons/material-icons';
import { TouchableOpacity } from 'react-native';
import { useCallback, useMemo } from 'react';
import { DialogManager } from '@react-stateless-dialog/core';
import { SelectDialog } from './select-dialog';

type SelectProps<T extends any> = {
  placeholder?: string;
  data: { label: string; value: T }[];
  value: T;
  onChange: (value: T) => any;
};

export const Select = <T extends any>(props: SelectProps<T>) => {
  const { placeholder, data, value, onChange } = props;

  const { label, color } = useMemo(() => {
    if (value !== undefined && value !== null) {
      const selectedItem = data.find((x) => x.value === value);
      if (selectedItem) {
        return { label: selectedItem.label ?? '', color: 'black' };
      }
    }
    return { label: placeholder ?? '', color: '#888888' };
  }, [placeholder, data, value]);

  const handleOpenDialog = useCallback(async () => {
    try {
      const result = await DialogManager().push(SelectDialog, { data }).waitPromise();
      onChange(result);
    } catch {}
  }, [data, onChange]);

  return (
    <TouchableOpacity onPress={handleOpenDialog}>
      <HStack borderRadius={8} borderWidth={1} borderColor="black" p={5}>
        <Text flex={1} color={color}>
          {label}
        </Text>
        <Icon name="keyboard-arrow-down" size={24} color="black" />
      </HStack>
    </TouchableOpacity>
  );
};
