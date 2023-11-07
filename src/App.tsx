import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { styled } from 'styled-components';
import { Layout } from './components/Layout';
import { Favorites } from './page/Favorites';
import { ItemDetails } from './page/ItemDetails';
import { SalesList } from './page/SalesList';
import { MyAccount } from './page/auth/MyAccount';
import { OAuthLoading } from './page/auth/OAuthLoading';
import { ChattingList } from './page/chat/ChattingList';
import { Home } from './page/home/Home';
import { ProtectedRoute } from './router/ProtectedRoute';
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
          <Route path="/items/:itemId" element={<ItemDetails />} />
          <Route path="/myAccount" element={<MyAccount />} />
          <Route
            path="/oauth2/authorization/github"
            element={<OAuthLoading />}
          />
          <Route path="/login/oauth2/code/github" element={<OAuthLoading />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/sellHistory" element={<SalesList />} />
            <Route path="/favoritesHistory" element={<Favorites />} />
            <Route path="/chat" element={<ChattingList />} />
          </Route>
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
