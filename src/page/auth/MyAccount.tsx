import { Header } from '../../components/Header';
import { useAuthStore } from '../../stores/useAuthStore';
import { LoginPage } from './LoginPage';
import { MyProfilePage } from './MyProfilePage';

export function MyAccount() {
  const { accessToken, refreshToken, nickname, profileImageUrl } =
    useAuthStore();
  const isLogin =
    accessToken !== '' &&
    refreshToken !== '' &&
    nickname !== '' &&
    profileImageUrl !== '';

  return (
    <>
      <Header title="내 계정" />
      {isLogin ? <MyProfilePage /> : <LoginPage />}
    </>
  );
}
