import { DialogComponent } from '@react-stateless-dialog/core';
import { Box } from '../uikit/Box';
import { MobilyWebhookStatus } from 'mobilyflow-react-native-sdk';
import { BaseDialog } from './base-dialog';
import { useMemo } from 'react';
import { ScrollView } from 'react-native';
import { Text } from '../uikit/text';
import { getMobilyflowErrorLabel } from '../../utils/utils';

export type PurchaseResultDialogArgs = {
  status: MobilyWebhookStatus;
  error?: any;
};

export const PurchaseResultDialog: DialogComponent<PurchaseResultDialogArgs, null> = (props) => {
  const { args, onCancel } = props;
  const { status, error } = args;

  const errorLabel = useMemo(() => getMobilyflowErrorLabel(error), [error]);

  return (
    <BaseDialog title={'Purchase Result'} onCancel={onCancel}>
      <ScrollView>
        <Box p={20} gap={10}>
          <Text>Webhook Status: {status}</Text>
          {errorLabel && <Text color="red">{errorLabel}</Text>}
        </Box>
      </ScrollView>
    </BaseDialog>
  );
};

PurchaseResultDialog.horizontal = 'stretch';
PurchaseResultDialog.vertical = 'center';
