import { ChangeEvent, useState } from 'react';
import { styled } from 'styled-components';
import { Alert } from '../../components/Alert';
import { Icon } from '../../components/icon/Icon';

type ProfileButtonProps = {
  file: File | undefined;
  backgroundImage: string | undefined;
  inputRef: React.RefObject<HTMLInputElement>;
  onRemoveProfile: () => void;
  onChangeFile: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function ProfileButton({
  file,
  backgroundImage,
  inputRef,
  onRemoveProfile,
  onChangeFile,
}: ProfileButtonProps) {
  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const onOpenAlert = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsOpenAlert(true);
  };

  const onCloseAlert = () => {
    setIsOpenAlert(false);
  };

  return (
    <Div>
      <ImageButton
        onClick={() => inputRef.current?.click()}
        $backgroundImage={backgroundImage}
      >
        <IconWrapper $backgroundImage={backgroundImage}>
          <Icon name="camera" color="accentText" />
        </IconWrapper>
        {(file || backgroundImage) && (
          <RemoveButton onClick={onOpenAlert}>
            <Icon name="x" color="accentText" />
          </RemoveButton>
        )}
      </ImageButton>
      <input
        ref={inputRef}
        type="file"
        id="profileButton"
        accept="image/*"
        onChange={onChangeFile}
      />
      {isOpenAlert && (
        <Alert
          isOpen={isOpenAlert}
          onClose={onCloseAlert}
          onAction={onRemoveProfile}
        >
          프로필을 삭제할까요?
        </Alert>
      )}
    </Div>
  );
}

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

const ImageButton = styled.button<{ $backgroundImage: string | undefined }>`
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

const IconWrapper = styled.div<{ $backgroundImage: string | undefined }>`
  display: ${({ $backgroundImage }) => ($backgroundImage ? 'none' : 'block')};

  ${ImageButton}:hover & {
    display: block;
  }
`;

const RemoveButton = styled.div`
  width: 28px;
  height: 28px;
  position: absolute;
  top: -5px;
  right: -5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: ${({ theme }) => theme.color.neutralTextStrong};
`;
