import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type State = {
  count: number;
  increment: () => void;
};

export const countStore = create<State>(set => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
}));

type NameState = {
  firstName: string;
  lastName: string;
};

type NameAction = {
  updateFirstName: (firstName: NameState['firstName']) => void;
  updateLastName: (lastName: NameState['lastName']) => void;
};

export const useNameStore = create<NameState & NameAction>()(
  devtools(set => ({
    firstName: '',
    lastName: '',
    updateFirstName: firstName => set({ firstName }),
    updateLastName: lastName => set({ lastName }),
  }))
);
