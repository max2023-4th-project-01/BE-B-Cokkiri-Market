import { Header } from '../../components/Header';
import { useAuthStore } from '../../stores/useAuthStore';
import { LoginPage } from './LoginPage';
import { MyProfilePage } from './MyProfilePage';

export function MyAccount() {
  const authenticated = useAuthStore(state => state.authenticated);

  return (
    <>
      <Header title="내 계정" />
      {authenticated ? <MyProfilePage /> : <LoginPage />}
    </>
  );
}
