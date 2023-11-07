import { ReactElement } from 'react';
import { create } from 'zustand';

type PanelState = {
  isOpen: boolean;
  panelChildren: ReactElement | null;
  openPanel: (panelChildren: ReactElement) => void;
  closePanel: () => void;
  clearPanel: () => void;
};

export const usePanelStore = create<PanelState>(set => ({
  isOpen: false,
  panelChildren: null,
  openPanel: panelChildren => {
    set({ isOpen: true, panelChildren: panelChildren });
  },
  closePanel: () => {
    set({ isOpen: false });
  },
  clearPanel: () => {
    set({ panelChildren: null });
  },
}));
