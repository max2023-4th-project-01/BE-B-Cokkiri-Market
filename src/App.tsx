import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { styled } from 'styled-components';
import { Badge } from './components/Badge';
import { Button } from './components/Button';
import { Modal } from './components/Modal';
import { TestModalContent } from './components/TestModalContent';
import { Icon } from './components/icon/Icon';
import elephantImg from '/elephant-bg.png';

export function App() {
  const [isOpen, setIsOpen] = useState(false);

  const { data, error, isLoading } = useQuery<string, Error>(
    ['test'],
    fetchTest
  );

  if (isLoading) console.log('loading');

  if (error) console.log(error.message);

  async function fetchTest() {
    const res = await fetch('/api/test');

    return res.json();
  }

  return (
    <AppContainer>
      <Layout>
        <div>{data}</div>
        <Button styledType="container" color="accentPrimary">
          <Login>로그인</Login>
        </Button>
        <Button styledType="outline" color="neutralBorder">
          <Add>추가</Add>
        </Button>
        <Button styledType="ghost">
          <SignUp>회원가입</SignUp>
        </Button>
        <Button styledType="circle" color="accentPrimary">
          <Plus>+</Plus>
        </Button>
        <Wrapper>
          <Icon name="camera" color="accentPrimary" />
          <Icon name="check" color="accentSecondary" />
          <Icon name="chevronDown" color="systemWarning" />
          <Icon name="chevronLeft" color="accentTextWeak" />
          <Icon name="chevronRight" color="neutralTextWeak" />
          <Icon name="chevronUp" color="neutralTextStrong" />
          <Icon name="circleXFilled" color="neutralBackgroundBold" />
          <Icon name="dots" color="neutralOverlay" />
          <Icon name="exclamationCircle" color="neutralBorderStrong" />
          <Icon name="heart" color="neutralOverlay" />
          <Icon name="home" color="neutralText" />
        </Wrapper>
        <Wrapper>
          <Badge
            type="container"
            size="S"
            text="예약중"
            fontColor="accentText"
            badgeColor="accentSecondary"
          />
          <Badge
            type="container"
            size="M"
            text="기타중고물품"
            fontColor="accentText"
            badgeColor="accentPrimary"
          />
          <Badge
            type="outline"
            size="M"
            text="여성패션"
            fontColor="accentTextWeak"
            badgeColor="neutralBorder"
          />
          <Badge
            type="container"
            size="M"
            text="1 / 2"
            fontColor="neutralTextWeak"
            badgeColor="neutralBackgroundBlur"
          />
        </Wrapper>
        <Button
          styledType="outline"
          color="neutralBorder"
          onClick={() => setIsOpen(true)}
        >
          Open Modal
        </Button>
        {isOpen && (
          <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            headline="동네 설정"
          >
            <TestModalContent />
          </Modal>
        )}
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
`;

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
  color: ${({ theme }) => theme.color.systemBackgroundWeak};
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

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
