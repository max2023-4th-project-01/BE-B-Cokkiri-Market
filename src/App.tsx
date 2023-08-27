import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { styled } from 'styled-components';
import { Icon } from './components/icon/Icon';
import { Main } from './page/Main';
import { Test } from './page/Test';
import { MyAccount } from './page/auth/MyAccount';
import elephantImg from '/elephant-bg.png';

export function App() {
  return (
    <AppContainer>
      <Layout>
        <Router>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/test" element={<Test />} />
            <Route path="/myAccount" element={<MyAccount />} />
          </Routes>
          <Footer />
        </Router>
      </Layout>
    </AppContainer>
  );
}

function Footer() {
  return (
    <FooterDiv>
      <Tab to="/">
        <Icon name="home" color="accentPrimary" />
        <Label>홈화면</Label>
      </Tab>
      <Tab to="/">
        <Icon name="news" color="accentSecondary" />
        <Label>판매내역</Label>
      </Tab>
      <Tab to="/">
        <Icon name="heart" color="systemWarning" />
        <Label>관심상품</Label>
      </Tab>
      <Tab to="/test">
        <Icon name="check" color="accentTextWeak" />
        <Label>test</Label>
      </Tab>
      <Tab to="/myAccount">
        <Icon name="userCircle" color="neutralTextWeak" />
        <Label>내 계정</Label>
      </Tab>
    </FooterDiv>
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

const Layout = styled.div`
  width: 393px;
  height: 852px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 0 auto;
  border: 1px solid ${({ theme }) => theme.color.neutralBorder};
  font: ${({ theme }) => theme.font.displayStrong20};
  color: ${({ theme }) => theme.color.neutralTextStrong};
  background-color: ${({ theme }) => theme.color.accentText};
  overflow: hidden;
`;

const FooterDiv = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  border-top: ${({ theme }) => `0.8px solid ${theme.color.neutralBorder}`};
`;

const Tab = styled(Link)`
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  text-decoration: none;
`;

const Label = styled.span`
  font: ${({ theme }) => theme.font.availableStrong10};
  color: ${({ theme }) => theme.color.neutralTextWeak};
`;
