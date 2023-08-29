import { MouseEvent } from 'react';
import { styled } from 'styled-components';
import { useLocationStore } from '../stores/useLocationStore';
import { Button } from './Button';
import { Icon } from './icon/Icon';

type LocationButtonProps = {
  locationData: {
    id: number;
    name: string;
    isSelected: boolean;
  };
  onOpenAlert: () => void;
  onDelete: (locationId: number) => void;
};

export function LocationButton({
  locationData,
  onOpenAlert,
}: LocationButtonProps) {
  const { setSelectedLocationId } = useLocationStore();

  const onDeleteLocation = (event: MouseEvent) => {
    event.stopPropagation();
    setSelectedLocationId(locationData.id);
    onOpenAlert();
    // TODO: Alert의 onAction을 통해 삭제 요청, 클릭된 location의 id를 전달해야함
  };

  return (
    <Location
      styledType="container"
      color={locationData.isSelected ? 'accentPrimary' : 'neutralTextWeak'}
      onClick={() => {
        console.log('내 동네 선택하기');
      }}
    >
      <Text>{locationData.name}</Text>
      <Icon
        name="circleXFilled"
        color="accentText"
        onClick={onDeleteLocation}
      />
    </Location>
  );
}

const Location = styled(Button)`
  width: 288px;
  height: 56px;
  justify-content: space-between;
  padding: 16px 8px 16px 16px;
  font: ${({ theme }) => theme.font.availableStrong16};
  color: ${({ theme }) => theme.color.accentText};
`;

const Text = styled.span``;
