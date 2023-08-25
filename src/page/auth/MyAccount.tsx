import { ChangeEvent, useState } from 'react';
import { styled } from 'styled-components';
import { Button } from '../../components/Button';
import { AuthInput } from './AuthInput';
import { SignUpPanel } from './SignUpPanel';

export function MyAccount() {
  const [isOpenPanel, setIsOpenPanel] = useState(false);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const openPanel = () => {
    setIsOpenPanel(true);
  };

  const closePanel = () => {
    console.log(1);
    setIsOpenPanel(false);
  };

  const onChangeId = (event: ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const submit = () => {
    console.log(id, password);
  };

  return (
    <>
      {isOpenPanel && <SignUpPanel closePanel={closePanel} />}
      <Div>
        <Header>내 계정</Header>
        <Body>
          <AuthInput
            id={id}
            password={password}
            onChangeId={onChangeId}
            onChangePassword={onChangePassword}
          />
          <ButtonWrapper>
            <Button
              styledType="container"
              color="accentPrimary"
              onClick={submit}
            >
              <LoginDiv>로그인</LoginDiv>
            </Button>
            <Button styledType="ghost" onClick={openPanel}>
              <SignUpDiv>회원가입</SignUpDiv>
            </Button>
          </ButtonWrapper>
        </Body>
      </Div>
    </>
  );
}

const Div = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  height: 56px;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 8px;
  border-bottom: ${({ theme }) => `0.8px solid ${theme.color.neutralBorder}`};
  font: ${({ theme }) => theme.font.displayStrong16};
  background: ${({ theme }) => theme.color.neutralBackgroundBlur};
  color: ${({ theme }) => theme.color.neutralTextStrong};
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 40px;
  flex: 1;
  padding: 0 32px;
`;

const LoginDiv = styled.div`
  width: 297px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  font: ${({ theme }) => theme.font.availableStrong16};
  color: ${({ theme }) => theme.color.accentText};
`;

const SignUpDiv = styled.div`
  width: 45px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  font: ${({ theme }) => theme.font.availableStrong12};
  color: ${({ theme }) => theme.color.neutralText};
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 16px;
`;
