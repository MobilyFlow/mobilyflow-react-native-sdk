import { DialogComponent } from '@react-stateless-dialog/core';
import { Box } from '../uikit/Box';
import { MobilyError, MobilyPurchaseError, WebhookStatus } from 'mobilyflow-react-native-sdk';
import { BaseDialog } from './base-dialog';
import { useMemo } from 'react';
import { ScrollView } from 'react-native';
import { Text } from '../uikit/text';

export type PurchaseResultDialogArgs = {
  status: WebhookStatus;
  error?: any;
};

export const PurchaseResultDialog: DialogComponent<PurchaseResultDialogArgs, null> = (props) => {
  const { args, onCancel } = props;
  const { status, error } = args;

  const errorLabel = useMemo(() => {
    if (error) {
      if (error instanceof MobilyPurchaseError) {
        return `[MobilyPurchaseError] ${MobilyPurchaseError.Type[error.type]}`;
      } else if (error instanceof MobilyError) {
        return `[MobilyError] ${MobilyPurchaseError.Type[error.type]}`;
      } else {
        return `[Error] ${error}`;
      }
    }
    return null;
  }, [error]);

  return (
    <BaseDialog title={'Purchase Result'} onCancel={onCancel}>
      <ScrollView>
        <Box p={20} gap={10}>
          <Text>Webhook Status: {WebhookStatus[status]}</Text>
          {errorLabel && <Text color="red">{errorLabel}</Text>}
        </Box>
      </ScrollView>
    </BaseDialog>
  );
};

PurchaseResultDialog.horizontal = 'stretch';
PurchaseResultDialog.vertical = 'center';
