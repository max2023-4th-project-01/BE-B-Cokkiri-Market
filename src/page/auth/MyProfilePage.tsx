import { ChangeEvent, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { useChangeProfileImage } from '../../api/fetchers/authFetcher';
import { Button } from '../../components/button/Button';
import { useAuthStore } from '../../stores/useAuthStore';
import { useToastStore } from '../../stores/useToastStore';
import { ProfileButton } from './ProfileButton';

export function MyProfilePage() {
  const { nickname, profileImageUrl, clearUserState } = useAuthStore(state => ({
    nickname: state.nickname,
    profileImageUrl: state.profileImageUrl,
    clearUserState: state.clearUserState,
  }));

  const showToast = useToastStore(state => state.showToast);
  const { changeProfileImage } = useChangeProfileImage();

  const [file, setFile] = useState<File>();
  const [backgroundImage, setBackgroundImage] = useState<string | undefined>(
    profileImageUrl
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const changedProfile = file !== undefined || backgroundImage === undefined;

  const logout = () => {
    clearUserState();
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

  const onCancelChangedProfile = () => {
    setFile(undefined);
    setBackgroundImage(profileImageUrl);
  };

  const onSaveProfile = async () => {
    const formData = new FormData();

    if (file) {
      formData.append('profileImageFile', file);
    }

    const res = await changeProfileImage(formData);

    if (res.status === 200) {
      showToast({ mode: 'success', message: '프로필 이미지 변경 성공!' });
      setBackgroundImage(res.data.profileImageUrl);
      setFile(undefined);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    } else {
      showToast({ mode: 'error', message: '프로필 이미지 변경 실패' });
    }
  };

  return (
    <Div>
      <ProfileWrapper>
        <ProfileButton
          file={file}
          backgroundImage={backgroundImage}
          inputRef={inputRef}
          onChangeFile={onChangeFile}
          onRemoveProfile={onRemoveProfile}
        />
        {changedProfile && (
          <ProfileEditButtons>
            <Button
              styledType="outline"
              color="neutralBorderStrong"
              size="S"
              onClick={onCancelChangedProfile}
            >
              취소
            </Button>
            <Button
              styledType="container"
              color="accentPrimary"
              fontColor="accentText"
              size="S"
              onClick={onSaveProfile}
            >
              저장
            </Button>
          </ProfileEditButtons>
        )}
        <UserName>{nickname}</UserName>
      </ProfileWrapper>
      <Button
        styledType="container"
        color="accentPrimary"
        fontColor="accentText"
        onClick={logout}
      >
        로그아웃
      </Button>
    </Div>
  );
}

const Div = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1;
  gap: 40px;
  padding: 0 32px;
  margin-top: 138px;
  background: ${({ theme }) => theme.color.accentText};
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

const ProfileEditButtons = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
`;

const UserName = styled.div`
  width: 100%;
  font: ${({ theme }) => theme.font.availableStrong16};
  color: ${({ theme }) => theme.color.neutralText};
  text-align: center;
`;
