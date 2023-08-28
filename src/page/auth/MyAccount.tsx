import { styled } from 'styled-components';
import { useAuthStore } from '../../stores/authStore';
import { LoginPage } from './LoginPage';
import { MyProfilePage } from './MyProfilePage';

export function MyAccount() {
  const authStore = useAuthStore();

  return (
    <>
      <Header>내 계정</Header>
      {authStore.accessToken ? <MyProfilePage /> : <LoginPage />}
    </>
  );
}

const Header = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 8px;
  border-bottom: ${({ theme }) => `0.8px solid ${theme.color.neutralBorder}`};
  font: ${({ theme }) => theme.font.displayStrong16};
  background: ${({ theme }) => theme.color.neutralBackgroundBlur};
  color: ${({ theme }) => theme.color.neutralTextStrong};
`;
