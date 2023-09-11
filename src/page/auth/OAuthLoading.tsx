import { styled } from 'styled-components';
import { BASE_URL } from '../../api/axios';
import { Header } from '../../components/Header';
import { Loader } from '../../components/Loader';
import { LoginPage } from './LoginPage';

export function OAuthLoading() {
  const pathAndQuery = window.location.pathname + window.location.search;

  const login = async () => {
    const url = `${BASE_URL}:8080${pathAndQuery}`;
    const res = await fetch(url);

    console.log(await res.json());
  };

  login();
  return (
    <>
      <Header title="내 계정" />
      <LoginPage />
      <Body>
        <Loader text="Github로 로그인 중" />
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
