import { create } from 'zustand';

interface MobilyflowState {
  isLoading: boolean;
  error?: any;
}

export const useMobilyflowStore = create<MobilyflowState>(() => ({
  isLoading: true,
}));
