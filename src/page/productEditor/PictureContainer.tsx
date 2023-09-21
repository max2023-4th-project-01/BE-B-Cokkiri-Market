import { ChangeEvent, useMemo, useRef } from 'react';
import { styled } from 'styled-components';
import { Button } from '../../components/button/Button';
import { Icon } from '../../components/icon/Icon';
import { PICTURE_MAX_LENGTH, PictureListType } from './ProductEditorPanel';

type PictureContainerProps = {
  pictureList: PictureListType[];
  uploadPictureList: File[];
  addPicture: (event: ChangeEvent<HTMLInputElement>) => void;
  deletePicture: (pictureData: File | PictureListType) => void;
};

export function PictureContainer({
  pictureList,
  uploadPictureList,
  addPicture,
  deletePicture,
}: PictureContainerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const memoizedUrls = useMemo(() => {
    return uploadPictureList.map(picture => URL.createObjectURL(picture));
  }, [uploadPictureList]);

  const handleWheelEvent = (event: React.WheelEvent<HTMLDivElement>) => {
    const element = event.currentTarget;
    element.scrollLeft += event.deltaY / 2;
  };

  return (
    <>
      <PictureAddButton
        styledType="outline"
        color="neutralBorder"
        onClick={() => inputRef.current?.click()}
      >
        <Icon name="camera" color="neutralTextStrong" />
        <span>
          {pictureList.length + uploadPictureList.length}/{PICTURE_MAX_LENGTH}
        </span>
        <input
          multiple
          ref={inputRef}
          type="file"
          id="profileButton"
          accept="image/*"
          onChange={addPicture}
        />
      </PictureAddButton>
      <PictureList onWheel={handleWheelEvent}>
        {pictureList.map((picture, index) => {
          return (
            <Picture key={index} $backgroundImage={picture.url}>
              <PictureDeleteButton onClick={() => deletePicture(picture)}>
                <Icon name="x" color="accentText" />
              </PictureDeleteButton>
              {index === 0 && <PictureLabel>대표 사진</PictureLabel>}
            </Picture>
          );
        })}
        {memoizedUrls.map((url, index) => {
          return (
            <Picture key={index} $backgroundImage={url}>
              <PictureDeleteButton
                onClick={() => deletePicture(uploadPictureList[index])}
              >
                <Icon name="x" color="accentText" />
              </PictureDeleteButton>
              {pictureList.length === 0 && index === 0 && (
                <PictureLabel>대표 사진</PictureLabel>
              )}
            </Picture>
          );
        })}
      </PictureList>
    </>
  );
}

const PictureAddButton = styled(Button)`
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 16px;

  & > span {
    font: ${({ theme }) => theme.font.displayDefault12};
    color: ${({ theme }) => theme.color.neutralTextStrong};
  }

  & > input {
    display: none;
  }
`;

const PictureList = styled.div`
  width: 100%;
  height: 95px;
  display: flex;
  align-items: center;
  gap: 16px;
  overflow-y: hidden;
  overflow-x: scroll;
  white-space: nowrap;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.color.neutralBorderStrong};
    border-radius: 10px;
  }
`;

const Picture = styled.div<{ $backgroundImage: string }>`
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: end;
  position: relative;
  border-radius: 16px;
  border: 1px solid var(--neutral-border, rgba(179, 179, 179, 0.39));
  background:
    ${({ $backgroundImage }) => `url(${$backgroundImage})`},
    lightgray 50% / cover no-repeat;
  background-size: cover;
  flex-shrink: 0;
`;

const PictureDeleteButton = styled.button`
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

const PictureLabel = styled.span`
  width: 100%;
  height: 24px;
  border-radius: 0px 0px 16px 16px;
  background: ${({ theme }) => theme.color.neutralOverlay};
  color: ${({ theme }) => theme.color.neutralBackground};
  font: ${({ theme }) => theme.font.displayDefault12};
  text-align: center;
`;
