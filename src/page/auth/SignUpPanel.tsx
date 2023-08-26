import { ChangeEvent, useEffect, useRef, useState } from 'react';
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
  const [location, setLocation] = useState('역삼1동');
  const [file, setFile] = useState<File>();
  const [backgroundImage, setBackgroundImage] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);

  const isValidId = /^[A-Za-z0-9]{6,20}$/.test(id);
  const isValidPassword = /^[A-Za-z0-9]{6,20}$/.test(password);
  const isNullLocation = location === '';

  const isSignUpDisabled = !(isValidId && isValidPassword && !isNullLocation);

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

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;

    if (!fileList) return;

    if (fileList) {
      const file = fileList[0];
      if (file && file.type.startsWith('image/')) {
        setFile(file);
        const reader = new FileReader();

        reader.onload = function (event) {
          if (event.target && event.target.readyState === FileReader.DONE) {
            setBackgroundImage(event.target.result as string);
          }
        };

        reader.readAsDataURL(file);
      } else {
        event.target.value = '';

        // TODO : toast alert 추가?
        alert('이미지 파일만 업로드 가능합니다.');
      }
    }
  };

  const removeProfile = () => {
    // TODO : alert component 추가해서 사용자의 동의 받기
    setFile(undefined);
    setBackgroundImage(undefined);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const submit = async () => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('password', password);
    formData.append('locationName', location);

    if (file) {
      formData.append('profileImageFile', file);
    }

    const res = await fetch('/api/signup', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    console.log('Response:', data);
  };

  return (
    <Div $right={rightPosition} onTransitionEnd={onTransitionEndHandler}>
      <Header>
        <Button styledType="ghost" onClick={onClose}>
          <ButtonDiv>닫기</ButtonDiv>
        </Button>
        <Title>회원가입</Title>
        <Button styledType="ghost" onClick={submit} disabled={isSignUpDisabled}>
          <ButtonDiv>완료</ButtonDiv>
        </Button>
      </Header>
      <Body>
        <ProfileWrapper>
          <ProfileButton
            htmlFor="profileButton"
            $backgroundImage={backgroundImage}
          >
            <Icon name="camera" color="accentText" />
          </ProfileButton>
          {file && (
            <RemoveProfileButton onClick={removeProfile}>
              프로필 삭제
            </RemoveProfileButton>
          )}
        </ProfileWrapper>
        <input
          ref={inputRef}
          type="file"
          id="profileButton"
          accept="image/*"
          onChange={handleFileChange}
        />
        <AuthInput
          id={id}
          password={password}
          onChangeId={onChangeId}
          onChangePassword={onChangePassword}
        />
        <Button
          styledType="outline"
          color="neutralBorder"
          onClick={() => setLocation('역삼1동')}
        >
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

  & #profileButton {
    display: none;
  }
`;

const ProfileWrapper = styled.div`
  height: 115px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;
`;

const ProfileButton = styled.label<{ $backgroundImage: string | undefined }>`
  width: 80px;
  height: 80px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${({ theme }) => `1px solid ${theme.color.neutralBorder}`};
  border-radius: 50%;
  background: ${({ $backgroundImage, theme }) =>
    $backgroundImage ? `url(${$backgroundImage})` : theme.color.neutralOverlay};
  background-size: cover;
  cursor: pointer;
`;

const RemoveProfileButton = styled.button`
  width: 90px;
  height: 30px;
  border-radius: 8px;
  padding: 0 5px;
  font: ${({ theme }) => theme.font.availableStrong12};
  background: ${({ theme }) => theme.color.accentPrimary};
  color: ${({ theme }) => theme.color.accentText};
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
