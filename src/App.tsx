import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { styled } from 'styled-components';
import { Layout } from './components/Layout';
import { Test } from './page/Test';
import { MyAccount } from './page/auth/MyAccount';
import { Home } from './page/home/Home';
import { useScreenConfigStore } from './stores/useScreenConfigStore';
import elephantImg from '/elephant-bg.png';

export function App() {
  const { updateConfig } = useScreenConfigStore();

  useEffect(() => {
    window.addEventListener('resize', updateConfig);

    return () => {
      window.removeEventListener('resize', updateConfig);
    };
  }, [updateConfig]);

  return (
    <AppContainer>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
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
