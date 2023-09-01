import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import axios from '../../api/axios';
import { API_ENDPOINT } from '../../api/endPoint';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Icon } from '../../components/icon/Icon';
import { useScreenConfigStore } from '../../stores/useScreenConfigStore';
import { AuthInput } from './AuthInput';
import { ProfileButton } from './ProfileButton';

type SignUpPanelProps = {
  closePanel: () => void;
};

export function SignUpPanel({ closePanel }: SignUpPanelProps) {
  const { screenWidth } = useScreenConfigStore();
  const [rightPosition, setRightPosition] = useState(-screenWidth);
  const inputRef = useRef<HTMLInputElement>(null);

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('역삼1동');
  const [file, setFile] = useState<File>();
  const [backgroundImage, setBackgroundImage] = useState<string>();

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
    setRightPosition(-screenWidth);
  };

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
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

  const onRemoveProfile = () => {
    // TODO : alert component 추가해서 사용자의 동의 받기
    setFile(undefined);
    setBackgroundImage(undefined);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const submit = async () => {
    const formData = new FormData();
    const signupData = {
      username: id,
      nickName: 'JayJay', // TODO : 닉네임 입력 받아 추가
      password: password,
      locationName: location,
    };

    formData.append(
      'signupData',
      new Blob([JSON.stringify(signupData)], { type: 'application/json' }),
      'signupData'
    );

    if (file) {
      formData.append('profileImageFile', file);
    }

    const res = await axios.post(API_ENDPOINT.SIGNUP, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (res.statusText === 'OK') {
      console.log('Response:', res.data);
      closePanel();
    }
  };

  return (
    <Div $right={rightPosition} onTransitionEnd={onTransitionEndHandler}>
      <Header
        leftButton={
          <Button styledType="ghost" onClick={onClose}>
            <ButtonDiv>닫기</ButtonDiv>
          </Button>
        }
        rightButton={
          <Button
            styledType="ghost"
            onClick={submit}
            disabled={isSignUpDisabled}
          >
            <ButtonDiv>완료</ButtonDiv>
          </Button>
        }
        title="회원가입"
      />
      <Body>
        <ProfileWrapper>
          <ProfileButton
            file={file}
            backgroundImage={backgroundImage}
            inputRef={inputRef}
            onChangeFile={onChangeFile}
            onRemoveProfile={onRemoveProfile}
          />
        </ProfileWrapper>

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

const Body = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 40px;
  flex: 1;
  padding: 0 32px;
  margin-top: 138px;

  & > button {
    width: 100%;
  }
`;

const ProfileWrapper = styled.div`
  height: 115px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;

  & input {
    display: none;
  }
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
