import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type Location = {
  id: number;
  name: string;
  isSelected: boolean;
};

type LocationState = {
  locations: Location[];
  selectedLocationId: number | null;
};

type LocationAction = {
  setSelectedLocationId: (id: number) => void;
  setLocations: (locations: Location[]) => void;
  addLocation: (location: Location) => void;
  deleteLocation: (locationId: number) => void;
};

export const useLocationStore = create<LocationState & LocationAction>()(
  devtools(set => ({
    locations: [],
    selectedLocationId: null,
    setSelectedLocationId: id => set(() => ({ selectedLocationId: id })),
    setLocations: locations => set(() => ({ locations })),
    addLocation: location =>
      set(state => ({ locations: [...state.locations, location] })),
    deleteLocation: locationId =>
      set(state => ({
        locations: state.locations.filter(
          location => location.id !== locationId
        ),
      })),
  }))
);
