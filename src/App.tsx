import { Route, Routes } from 'react-router-dom';
import { styled } from 'styled-components';
import { Layout } from './components/Layout';
import { Main } from './page/Main';
import { Test } from './page/Test';
import { MyAccount } from './page/auth/MyAccount';
import elephantImg from '/elephant-bg.png';

export function App() {
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
