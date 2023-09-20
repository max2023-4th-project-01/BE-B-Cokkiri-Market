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
  const { setStateAccessToken, setStateRefreshToken, setStateUserInfo } =
    useAuthStore();

  const login = async (loginInfo: loginInfo) => {
    const res = await fetcher.post(API_ENDPOINT.LOGIN, loginInfo);

    if (res.status === 200) {
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

export const useChangeProfileImage = () => {
  const { nickname, setStateUserInfo } = useAuthStore();

  const changeProfileImage = async (profileImageFile: File | null) => {
    const res = await fetcher.patch(API_ENDPOINT.CHANGE_PROFILE_IMAGE, {
      profileImageFile,
    });

    if (res.status === 200) {
      console.log(res.data.profileImageUrl);
      setStateUserInfo({ nickname, profileImageUrl: res.data.profileImageUrl });
    }

    return res;
  };

  return { changeProfileImage };
};
