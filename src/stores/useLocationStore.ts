import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type LocationState = {
  selectedLocationId: number | null;
};

type LocationAction = {
  setSelectedLocationId: (id: number) => void;
};

export const useLocationStore = create<LocationState & LocationAction>()(
  devtools(set => ({
    selectedLocationId: null,
    setSelectedLocationId: id => set(() => ({ selectedLocationId: id })),
  }))
);
