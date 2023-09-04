import { ChangeEvent, useState } from 'react';
import { styled } from 'styled-components';
import axios from '../../api/axios';
import { API_ENDPOINT } from '../../api/endPoint';
import { Button } from '../../components/button/Button';
import { Icon } from '../../components/icon/Icon';
import { useAuthStore } from '../../stores/useAuthStore';
import { setAccessToken, setUserInfo } from '../../utils/localStorage';
import { AuthInput } from './AuthInput';
import { SignUpPanel } from './SignUpPanel';

export function LoginPage() {
  const { setStateAccessToken, setStateUserInfo } = useAuthStore();

  const [isOpenPanel, setIsOpenPanel] = useState(false);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const isValidId = /^[A-Za-z0-9]{6,20}$/.test(id);
  const isValidPassword = /^[A-Za-z0-9]{6,20}$/.test(password);

  const isLoginDisabled = !(isValidId && isValidPassword);

  const openPanel = () => {
    setIsOpenPanel(true);
  };

  const closePanel = () => {
    setIsOpenPanel(false);
  };

  const onChangeId = (event: ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const submit = async () => {
    const res = await axios.post(API_ENDPOINT.LOGIN, {
      username: id,
      password,
    });

    if (res.statusText === 'OK') {
      const data = res.data;
      const { accessToken, ...userInfo } = data;

      setAccessToken(accessToken);
      setUserInfo(userInfo);

      setStateAccessToken(accessToken);
      setStateUserInfo(userInfo);
    }
  };

  return (
    <>
      {isOpenPanel && <SignUpPanel closePanel={closePanel} />}
      <Div>
        <Body>
          <Button
            styledType="outline"
            color="neutralTextStrong"
            onClick={submit}
          >
            <Icon name="octocat" color="accentText" />
            GitHub 로그인
          </Button>
          <DividerContainer>
            <DividerLine />
            <DividerText>or</DividerText>
            <DividerLine />
          </DividerContainer>
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
              fontColor="accentText"
              onClick={submit}
              disabled={isLoginDisabled}
            >
              로그인
            </Button>

            <Button size="M" styledType="text" onClick={openPanel}>
              회원가입
            </Button>
          </ButtonWrapper>
        </Body>
      </Div>
    </>
  );
}

const Div = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1;
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 24px;
  flex: 1;
  padding: 0 32px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 16px;
`;

const DividerContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const DividerLine = styled.div`
  flex-grow: 1;
  height: 1px;
  background-color: ${({ theme }) => theme.color.neutralTextWeak};
`;

const DividerText = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  padding-bottom: 5px;
  font: ${({ theme }) => theme.font.availableDefault16};
  color: ${({ theme }) => theme.color.neutralTextWeak};
`;
