import { ChangeEvent, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { Button } from '../../components/Button';
import { Icon } from '../../components/icon/Icon';
import { AuthInput } from './AuthInput';

type SignUpPanelProps = {
  closePanel: () => void;
};

export function SignUpPanel({ closePanel }: SignUpPanelProps) {
  // TODO : 지금은 화면의 크기가 임의로 392로 지정되어 있다. 유저 화면 크기에 맞는 값으로 수정 하기
  const [rightPosition, setRightPosition] = useState(-392);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setRightPosition(0);
  }, []);

  const onChangeId = (event: ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onTransitionEndHandler = () => {
    rightPosition !== 0 && closePanel();
  };

  const onClose = () => {
    setRightPosition(-392);
  };

  return (
    <Div $right={rightPosition} onTransitionEnd={onTransitionEndHandler}>
      <Header>
        <Button styledType="ghost" onClick={onClose}>
          <ButtonDiv>닫기</ButtonDiv>
        </Button>
        <Title>회원가입</Title>
        <Button styledType="ghost">
          <ButtonDiv>완료</ButtonDiv>
        </Button>
      </Header>
      <Body>
        <ProfileButton>
          <Icon name="camera" color="accentText" />
        </ProfileButton>
        <AuthInput
          id={id}
          password={password}
          onChangeId={onChangeId}
          onChangePassword={onChangePassword}
        />
        <Button styledType="outline" color="neutralBorder">
          <AddLocation>
            <Icon name="plus" color="accentTextWeak" />
            위치 추가
          </AddLocation>
        </Button>
      </Body>
    </Div>
  );
}

const Div = styled.div<{ $right: number }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: ${({ $right }) => `${$right}px`};
  display: flex;
  align-items: center;
  flex-direction: column;
  border: ${({ theme }) => `0.8px solid ${theme.color.neutralBorder}`};
  background: ${({ theme }) => theme.color.accentText};
  transition: right 0.6s;
  z-index: 1;
`;

const Header = styled.div`
  width: 100%;
  height: 56px;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
  border-bottom: ${({ theme }) => `0.8px solid ${theme.color.neutralBorder}`};
  background: ${({ theme }) => theme.color.neutralBackgroundBlur};
`;

const Title = styled.div`
  width: 130px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font: ${({ theme }) => theme.font.displayStrong16};
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

  & > button {
    width: 100%;
  }
`;

const ProfileButton = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${({ theme }) => `1px solid ${theme.color.neutralBorder}`};
  border-radius: 50%;
  background: ${({ theme }) => theme.color.neutralOverlay};
  cursor: pointer;
`;

const ButtonDiv = styled.div`
  font: ${({ theme }) => theme.font.availableStrong16};
  color: ${({ theme }) => theme.color.neutralTextStrong};
`;

const AddLocation = styled.div`
  width: 100%;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  font: ${({ theme }) => theme.font.availableStrong16};
  color: ${({ theme }) => theme.color.accentTextWeak};
`;
