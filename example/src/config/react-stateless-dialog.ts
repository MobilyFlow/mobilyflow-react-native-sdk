import { extendConfig } from '@react-stateless-dialog/core';
import { StatelessDialogConfigNative } from '@react-stateless-dialog/native';
import { AppProgress } from '../components/app-progress';

export const statelessDialogConfig = extendConfig(StatelessDialogConfigNative, {
  progress: {
    Component: AppProgress,
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
