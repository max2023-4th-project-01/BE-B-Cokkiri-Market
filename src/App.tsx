import { useState } from 'react';
import { styled } from 'styled-components';
import { Button } from './components/Button';
import { Modal } from './components/Modal';
import { TestModalContent } from './components/TestModalContent';
import elephantImg from '/elephant-bg.png';

export function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AppContainer>
      <Layout>
        <Button type="container" color="accentPrimary">
          <Login>로그인</Login>
        </Button>
        <Button type="outline" color="neutralBorder">
          <Add>추가</Add>
        </Button>
        <Button type="ghost">
          <SignUp>회원가입</SignUp>
        </Button>
        <Button type="circle" color="accentPrimary">
          <Plus>+</Plus>
        </Button>
        <Button
          type="outline"
          color="neutralBorder"
          onClick={() => setIsOpen(true)}
        >
          Open Modal
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          headline="동네 설정"
        >
          <TestModalContent />
        </Modal>
      </Layout>
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
}`;

const Layout = styled.div`
  width: 393px;
  height: 852px;
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
`;

const Login = styled.div`
  width: 297px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  font: ${({ theme }) => theme.font.availableStrong16};
  color: ${({ theme }) => theme.color.accentText};
`;

const Add = styled.div`
  width: 256px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  font: ${({ theme }) => theme.font.availableStrong16};
  color: ${({ theme }) => theme.color.accentTextWeak};
`;

const SignUp = styled.div`
  width: 45px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  font: ${({ theme }) => theme.font.availableStrong12};
  color: ${({ theme }) => theme.color.neutralText};
`;

const Plus = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font: ${({ theme }) => theme.font.availableStrong16};
  color: ${({ theme }) => theme.color.accentText};
`;
