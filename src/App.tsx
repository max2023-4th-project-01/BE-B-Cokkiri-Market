import { styled } from 'styled-components';
import { Button } from './components/Button';

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
    </Div>
  );
}

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
