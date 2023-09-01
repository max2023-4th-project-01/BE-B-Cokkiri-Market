import { Header } from '../../components/Header';
import { useAuthStore } from '../../stores/useAuthStore';
import { LoginPage } from './LoginPage';
import { MyProfilePage } from './MyProfilePage';

export function MyAccount() {
  const authStore = useAuthStore();

  return (
    <>
      <Header title="내 계정" />
      {authStore.accessToken ? <MyProfilePage /> : <LoginPage />}
    </>
  );
}
