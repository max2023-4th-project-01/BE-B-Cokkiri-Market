import { shallow } from 'zustand/shallow';
import { useAuthStore } from '../../stores/useAuthStore';
import { fetcher } from '../axios';
import { API_ENDPOINT } from '../endPoint';

type loginInfo = {
  username: string;
  password: string;
};

export const singup = async (formData: FormData) => {
  const res = await fetcher.post(API_ENDPOINT.SIGNUP, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  // TODO : 서버에서 에러 코드에 따라서 로직 추가 예정
  return res;
};

export const useLogin = () => {
  const {
    setAuthentication,
    setStateAccessToken,
    setStateRefreshToken,
    setStateUserInfo,
  } = useAuthStore(state => ({
    setAuthentication: state.setAuthentication,
    setStateAccessToken: state.setStateAccessToken,
    setStateRefreshToken: state.setStateRefreshToken,
    setStateUserInfo: state.setStateUserInfo,
  }));

  const login = async (loginInfo: loginInfo) => {
    const res = await fetcher.post(API_ENDPOINT.LOGIN, loginInfo);

    if (res.status === 200) {
      setAuthentication(true);
      const accessToken = res.headers['authorization'];
      const refreshToken = res.headers['refresh-token'];
      const userInfo = res.data;

      setStateAccessToken(accessToken);
      setStateRefreshToken(refreshToken);
      setStateUserInfo(userInfo);
    }

    // TODO : 서버에서 에러 코드에 따라서 로직 추가 예정
    return res;
  };

  return { login };
};
