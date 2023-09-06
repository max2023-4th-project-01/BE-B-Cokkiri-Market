import { ChangeEvent, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { Button } from '../../components/button/Button';
import { useAuthStore } from '../../stores/useAuthStore';
import { ProfileButton } from './ProfileButton';

export function MyProfilePage() {
  const { nickname, profileImageUrl, clearUserState } = useAuthStore();

  const [file, setFile] = useState<File>();
  const [backgroundImage, setBackgroundImage] = useState<string | undefined>(
    profileImageUrl
  );

  const inputRef = useRef<HTMLInputElement>(null);

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
        <UserName>{nickname}</UserName>
        {/* TODO : 이미지 변경 시 저장 취소 버튼이 나오게한다. 취소하면 원래 이미지로, 저장하면 api 요청 */}
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

const UserName = styled.div`
  width: 100%;
  font: ${({ theme }) => theme.font.availableStrong16};
  color: ${({ theme }) => theme.color.neutralText};
  text-align: center;
`;
