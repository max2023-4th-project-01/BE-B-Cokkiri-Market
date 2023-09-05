type AuthStorage = {
  state: {
    accessToken: string;
    refreshToken: string;
    nickname: string;
    profileImageUrl: string;
    isLogin: boolean;
    username: string;
  };
  version: number;
};

export const getAccessToken = () => {
  const authStorageJSON = localStorage.getItem('auth-storage');
  const authStorage: AuthStorage = authStorageJSON
    ? JSON.parse(authStorageJSON)
    : null;

  return authStorage?.state.accessToken || null;
};

export const getRefreshToken = () => {
  const authStorageJSON = localStorage.getItem('auth-storage');
  const authStorage: AuthStorage = authStorageJSON
    ? JSON.parse(authStorageJSON)
    : null;

  return authStorage?.state.refreshToken || null;
};

export const getUserInfo = () => {
  const authStorageJSON = localStorage.getItem('auth-storage');
  const authStorage: AuthStorage = authStorageJSON
    ? JSON.parse(authStorageJSON)
    : null;

  if (authStorage) {
    return {
      nickname: authStorage.state.nickname,
      profileImageUrl: authStorage.state.profileImageUrl,
    };
  }

  return null;
};

export const clearAuthInfo = () => {
  localStorage.removeItem('auth-storage');
};
