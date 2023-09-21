import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserInfo = {
  nickname: string;
  profileImageUrl: string;
};

type AuthState = {
  accessToken: string;
  refreshToken: string;
  nickname: string;
  profileImageUrl: string;
  isLogin: boolean;
  setStateAccessToken: (accessToken: string) => void;
  setStateRefreshToken: (refreshToken: string) => void;
  setStateUserInfo: (userInfo: UserInfo) => void;
  clearUserState: () => void;
};

const hasValidLogin = (
  accessToken: string,
  refreshToken: string,
  nickname: string,
  profileImageUrl: string
) => {
  return (
    accessToken !== '' &&
    refreshToken !== '' &&
    nickname !== '' &&
    profileImageUrl !== ''
  );
};

export const useAuthStore = create(
  persist<AuthState>(
    set => ({
      accessToken: '',
      refreshToken: '',
      nickname: '',
      profileImageUrl: '',
      isLogin: false,
      setStateAccessToken: accessToken => {
        set(state => ({
          ...state,
          accessToken,
          isLogin: hasValidLogin(
            accessToken,
            state.refreshToken,
            state.nickname,
            state.profileImageUrl
          ),
        }));
      },
      setStateRefreshToken: refreshToken => {
        set(state => ({
          ...state,
          refreshToken,
          isLogin: hasValidLogin(
            state.accessToken,
            refreshToken,
            state.nickname,
            state.profileImageUrl
          ),
        }));
      },
      setStateUserInfo: userInfo => {
        set(state => ({
          ...state,
          ...userInfo,
          isLogin: hasValidLogin(
            state.accessToken,
            state.refreshToken,
            userInfo.nickname,
            userInfo.profileImageUrl
          ),
        }));
      },
      clearUserState: () => {
        set({
          accessToken: '',
          refreshToken: '',
          nickname: '',
          profileImageUrl: '',
          isLogin: false,
        });
      },
    }),
    {
      name: 'auth-storage',
      getStorage: () => localStorage,
      onRehydrateStorage: () => state => {
        if (state) {
          state.isLogin = hasValidLogin(
            state.accessToken,
            state.refreshToken,
            state.nickname,
            state.profileImageUrl
          );
        }
      },
    }
  )
);
