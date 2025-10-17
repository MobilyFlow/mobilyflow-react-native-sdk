import { useCallback } from 'react';
import { useMobilyflowStore } from '../stores/mobilyflow-store';
import { MobilyFlowService } from './mobilyflow-service';

export const useMobilyflowRefresh = () => {
  return useCallback(async () => {
    try {
      useMobilyflowStore.setState({ isLoading: true });
      MobilyFlowService.init();
      await MobilyFlowService.login();
      useMobilyflowStore.setState({ isLoading: false, error: null });
    } catch (error) {
      useMobilyflowStore.setState({ isLoading: false, error });
    }
  }, []);
};
