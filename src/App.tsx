import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { styled } from 'styled-components';
import { Layout } from './components/Layout';
import { Main } from './page/Main';
import { Test } from './page/Test';
import { MyAccount } from './page/auth/MyAccount';
import { useAuthStore } from './stores/useAuthStore';
import { getAccessToken, getUserInfo } from './utils/localStorage';
import elephantImg from '/elephant-bg.png';

export function App() {
  const { setStateAccessToken, setStateUserInfo } = useAuthStore();

  useEffect(() => {
    const accessToken = getAccessToken();
    const userInfo = getUserInfo();

    if (accessToken && userInfo) {
      setStateAccessToken(accessToken);
      setStateUserInfo(userInfo);
    }
  }, [setStateAccessToken, setStateUserInfo]);

  return (
    <AppContainer>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/test" element={<Test />} />
          <Route path="/myAccount" element={<MyAccount />} />
        </Route>
      </Routes>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.color.neutralBackgroundWeak};
  background-image: url(${elephantImg});
`;
