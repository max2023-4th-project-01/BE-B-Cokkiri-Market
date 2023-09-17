import { create } from 'zustand';

type ToastType = {
  message: string;
  type: 'success' | 'error' | 'warning';
  duration?: number;
};

type ToastState = {
  toast: ToastType | null;
  baseDuration: number;
  showToast: (toast: ToastType) => void;
  hideToast: () => void;
};

export const useToastStore = create<ToastState>(set => ({
  baseDuration: 3000,
  toast: null,
  showToast: toast => set(() => ({ toast })),
  hideToast: () => set({ toast: null }),
}));
