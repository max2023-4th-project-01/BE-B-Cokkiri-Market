import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { singup } from '../../api/fetchers/authFetcher';
import { useResetLocationResult } from '../../api/queries/useLocationQuery';
import { Header } from '../../components/Header';
import { Button } from '../../components/button/Button';
import { Icon } from '../../components/icon/Icon';
import { SignUpLocationModal } from '../../components/locations/SignUpLocationModal';
import { useScreenConfigStore } from '../../stores/useScreenConfigStore';
import { useToastStore } from '../../stores/useToastStore';
import { AuthInput } from './AuthInput';
import { ProfileButton } from './ProfileButton';
import { isValid } from './authConstant';

type SignUpPanelProps = {
  closePanel: () => void;
};

type LocationState = {
  id: number;
  name: string;
};

export function SignUpPanel({ closePanel }: SignUpPanelProps) {
  const { screenWidth } = useScreenConfigStore();
  const showToast = useToastStore(state => state.showToast);

  const [rightPosition, setRightPosition] = useState(-screenWidth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [location, setLocation] = useState<LocationState | null>(null);
  const [file, setFile] = useState<File>();
  const [backgroundImage, setBackgroundImage] = useState<string>();

  const resetLocationResult = useResetLocationResult();

  const isValidId = isValid(id, 'common');
  const isValidPassword = isValid(password, 'common');
  const isValidNickname = isValid(nickname, 'nickname');

  const isNullLocation = location === null;

  const isSignUpDisabled = !(
    isValidId &&
    isValidPassword &&
    isValidNickname &&
    !isNullLocation
  );

  useEffect(() => {
    setRightPosition(0);
  }, []);

  const onChangeId = (event: ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onChangeNickname = (event: ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const onTransitionEndHandler = () => {
    rightPosition !== 0 && closePanel();
  };

  const onClose = () => {
    setRightPosition(-screenWidth);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    resetLocationResult();
    setIsModalOpen(false);
  };

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;

    if (!fileList?.length) return;

    const file = fileList[0];

    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);

      setFile(file);
      setBackgroundImage(url);
    } else {
      event.target.value = '';
      alert('이미지 파일만 업로드 가능합니다.');
    }
  };

  const onRemoveProfile = () => {
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
      nickname: nickname,
      password: password,
      locationId: location?.id,
      locationName: location?.name,
    };

    formData.append(
      'signupData',
      new Blob([JSON.stringify(signupData)], { type: 'application/json' }),
      'signupData'
    );

    if (file) {
      formData.append('profileImageFile', file);
    }

    const res = await singup(formData);
    // TODO : 에러 예외 처리
    if (res.status === 201) {
      showToast({ mode: 'success', message: '회원가입 성공!' });
      closePanel();
    }
  };

  const onSetSignUpLocation = (locationId: number, locationName: string) => {
    setLocation({ id: locationId, name: locationName });
    setIsModalOpen(false);
  };

  return (
    <Div $right={rightPosition} onTransitionEnd={onTransitionEndHandler}>
      <Header
        leftButton={
          <Button
            styledType="text"
            fontColor="neutralTextStrong"
            onClick={onClose}
          >
            닫기
          </Button>
        }
        rightButton={
          <Button
            styledType="text"
            fontColor="neutralTextStrong"
            onClick={submit}
            disabled={isSignUpDisabled}
          >
            완료
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
          nickname={nickname}
          onChangeId={onChangeId}
          onChangePassword={onChangePassword}
          onChangeNickname={onChangeNickname}
          onSubmit={submit}
        />
        {location ? (
          <Button
            color="accentPrimary"
            fontColor="accentText"
            onClick={openModal}
            align="space-between"
          >
            {location.name}
            <Icon name="pencil" color="accentText" />
          </Button>
        ) : (
          <Button
            styledType="outline"
            color="neutralBorder"
            fontColor="accentTextWeak"
            onClick={openModal}
          >
            <Icon name="plus" color="accentTextWeak" />
            위치 추가
          </Button>
        )}
      </Body>
      {isModalOpen && (
        <SignUpLocationModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSetSignUpLocation={onSetSignUpLocation}
        />
      )}
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
  gap: 15px;
  flex: 1;
  padding: 0 32px;
  margin-top: 138px;
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
