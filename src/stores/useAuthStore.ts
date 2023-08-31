import { create } from 'zustand';

type UserInfo = {
  username: string;
  profileImageUrl: string;
};

type AuthState = {
  accessToken: string;
  userName: string;
  profileImageUrl: string;
  setStateAccessToken: (token: string) => void;
  setStateUserInfo: (userInfo: UserInfo) => void;
  clearUserState: () => void;
};

export const useAuthStore = create<AuthState>(set => ({
  accessToken: '',
  userName: '',
  profileImageUrl: '',
  setStateAccessToken: (token: string) => set(() => ({ accessToken: token })),
  setStateUserInfo: (userInfo: UserInfo) => {
    set(() => ({ userName: userInfo.username }));
    set(() => ({ profileImageUrl: userInfo.profileImageUrl }));
  },
  clearUserState: () =>
    set({
      accessToken: '',
      userName: '',
      profileImageUrl: '',
    }),
}));
