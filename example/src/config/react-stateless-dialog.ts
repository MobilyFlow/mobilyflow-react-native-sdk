import { extendConfig } from '@react-stateless-dialog/core';
import { StatelessDialogConfigNative } from '@react-stateless-dialog/native';

export const statelessDialogConfig = extendConfig(StatelessDialogConfigNative, {
  progress: {
    Component: null,
  },
  snackbar: {
    DefaultSnackbar: null,
  },
  dialog: {
    defaultConfig: {
      backgroundColor: '#100F0F99',
    },
  },
});
