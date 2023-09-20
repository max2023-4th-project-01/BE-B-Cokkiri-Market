import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type UserInfo = {
  nickname: string;
  profileImageUrl: string;
};

type AuthState = {
  authenticated: boolean;
  accessToken: string;
  refreshToken: string;
  nickname: string;
  profileImageUrl: string;
  setAuthentication: (val: boolean) => void;
  setStateAccessToken: (accessToken: string) => void;
  setStateRefreshToken: (refreshToken: string) => void;
  setStateUserInfo: (userInfo: UserInfo) => void;
  clearUserState: () => void;
};

export const useAuthStore = create(
  devtools(
    persist<AuthState>(
      set => ({
        authenticated: false,
        accessToken: '',
        refreshToken: '',
        nickname: '',
        profileImageUrl: '',
        setAuthentication: (val: boolean) => {
          set(() => ({ authenticated: val }));
        },
        setStateAccessToken: (accessToken: string) => {
          set(() => ({ accessToken }));
        },
        setStateRefreshToken: (refreshToken: string) => {
          set(() => ({ refreshToken }));
        },
        setStateUserInfo: (userInfo: UserInfo) => {
          set(state => ({
            ...state,
            ...userInfo,
          }));
        },
        clearUserState: () => {
          set({
            accessToken: '',
            refreshToken: '',
            nickname: '',
            profileImageUrl: '',
          });
        },
      }),
      {
        name: 'auth-storage',
        getStorage: () => localStorage,
      }
    )
  )
);
