import { styled } from 'styled-components';
import { Button } from './components/Button';
import { Icon } from './components/icon/Icon';

export function App() {
  return (
    <Div>
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
      <IconWrapper>
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
      </IconWrapper>
    </Div>
  );
}

const IconWrapper = styled.div`
  display: flex;
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

const Div = styled.div`
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 0 auto;
  font: ${({ theme }) => theme.font.displayStrong20};
  color: ${({ theme }) => theme.color.neutralTextStrong};
`;
