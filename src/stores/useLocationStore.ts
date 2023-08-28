import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type Location = {
  id: number;
  name: string;
  isSelected: boolean;
};

type LocationState = {
  locations: Location[];
};

type LocationAction = {
  setLocations: (locations: Location[]) => void;
  addLocation: (location: Location) => void;
  deleteLocation: (location: Location) => void;
};

export const useLocationStore = create<LocationState & LocationAction>()(
  devtools(set => ({
    locations: [],
    setLocations: locations => set(() => ({ locations })),
    addLocation: location =>
      set(state => ({ locations: [...state.locations, location] })),
    deleteLocation: location =>
      set(state => ({
        locations: state.locations.filter(l => l.id !== location.id),
      })),
  }))
);
