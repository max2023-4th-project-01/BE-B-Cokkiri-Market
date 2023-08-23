import { useState } from 'react';
import { styled } from 'styled-components';
import Modal from './components/Modal';
import elephantImg from '/elephant-bg.png';

export function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AppContainer>
      <Layout>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          I'm a Modal
          <Button onClick={() => setIsOpen(false)}>Close</Button>
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
  background-color: ${({ theme }) => theme.color.neutral.backgroundWeak};
  background-image: url(${elephantImg});
}`;

const Layout = styled.div`
  width: 393px;
  height: 852px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  border: 1px solid ${({ theme }) => theme.color.neutral.border};
  font: ${({ theme }) => theme.font.displayStrong20};
  color: ${({ theme }) => theme.color.neutral.textStrong};
  background-color: ${({ theme }) => theme.color.accent.text};
`;

// TODO: 추후 버튼 공통 컴포넌트로 교체
const Button = styled.button`
  width: 100px;
  height: 50px;
  border: 1px solid black;
  border-radius: 5px;
`;
