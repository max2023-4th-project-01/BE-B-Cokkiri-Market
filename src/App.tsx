import { styled } from 'styled-components';
import { Button } from './components/Button';
import { Icon2 } from './components/icon/Icon';

export function App() {
  return (
    <Div>
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
      <IconWrapper>
        <Icon2 name="camera" color="accentPrimary" />
        <Icon2 name="check" color="accentSecondary" />
        <Icon2 name="chevronDown" color="systemWarning" />
        <Icon2 name="chevronLeft" color="accentTextWeak" />
        <Icon2 name="chevronRight" color="neutralTextWeak" />
        <Icon2 name="chevronUp" color="neutralTextStrong" />
        <Icon2 name="circleXFilled" color="neutralBackgroundBold" />
        <Icon2 name="dots" color="neutralOverlay" />
        <Icon2 name="exclamationCircle" color="neutralBorderStrong" />
        <Icon2 name="heart" color="neutralOverlay" />
        <Icon2 name="home" color="neutralText" />
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
