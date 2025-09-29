import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useMobilyflowStore } from '../stores/mobilyflow-store';
import { MobilyFlowService } from './mobilyflow-service';

export const useMobilyflowRefresh = () => {
  const queryClient = useQueryClient();
  return useCallback(async () => {
    try {
      useMobilyflowStore.setState({ isLoading: true });
      MobilyFlowService.init();
      await MobilyFlowService.login();
      await queryClient.invalidateQueries({ queryKey: ['mobilyflow'] });
      useMobilyflowStore.setState({ isLoading: false, error: null });
    } catch (error) {
      useMobilyflowStore.setState({ isLoading: false, error });
    }
  }, [queryClient]);
};
