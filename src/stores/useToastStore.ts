import { create } from 'zustand';

export type ToastMode = 'success' | 'error' | 'warning';

export type ToastType = {
  id: number;
  message: string;
  mode: ToastMode;
  duration?: number;
};

type ToastState = {
  toasts: ToastType[];
  toastIdCounter: number;
  baseDuration: number;
  showToast: ({
    message,
    mode,
    duration,
  }: {
    message: string;
    mode: ToastMode;
    duration?: number;
  }) => void;
  hideToast: (id: number) => void;
};

export const useToastStore = create<ToastState>(set => ({
  baseDuration: 3000,
  toastIdCounter: 0,
  toasts: [],
  showToast: ({ message, mode, duration = 3000 }) =>
    set(state => ({
      toasts: [
        ...state.toasts,
        { message, mode, duration, id: state.toastIdCounter },
      ],
      toastIdCounter: state.toastIdCounter + 1,
    })),
  hideToast: id =>
    set(state => ({
      toasts: state.toasts.filter(toast => toast.id !== id),
    })),
}));
