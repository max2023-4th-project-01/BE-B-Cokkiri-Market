import { styled } from 'styled-components';
import { Header } from '../../components/Header';
import { Loader } from '../../components/Loader';
import { LoginPage } from './LoginPage';

export function OAuthLoading() {
  return (
    <>
      <Header title="내 계정" />
      <LoginPage />
      <Body>
        <Loader />
        <div>Github로 로그인 중</div>
      </Body>
    </>
  );
}

const Body = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  position: absolute;
  z-index: 10;
  background: ${({ theme }) => theme.color.neutralBackgroundBlur};
  backdrop-filter: blur(2px);
`;
