import { create } from 'zustand';

type AuthState = {
  accessToken: string;
  userName: string;
  profileImageUrl: string;
  setAccessToken: (token: string) => void;
  setUserName: (name: string) => void;
  setProfileImageUrl: (url: string) => void;
  clearUserState: () => void;
};

export const useAuthStore = create<AuthState>(set => ({
  accessToken: '',
  userName: '',
  profileImageUrl: '',
  setAccessToken: (token: string) => set(() => ({ accessToken: token })),
  setUserName: (name: string) => set(() => ({ userName: name })),
  setProfileImageUrl: (url: string) => set(() => ({ accessToken: url })),
  clearUserState: () =>
    set({
      accessToken: '',
      userName: '',
      profileImageUrl: '',
    }),
}));
