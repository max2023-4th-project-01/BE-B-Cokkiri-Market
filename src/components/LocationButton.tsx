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
  onSelect: (locationId: number) => void;
};

export function LocationButton({
  locationData,
  onOpenAlert,
  onSelect,
}: LocationButtonProps) {
  const { setSelectedLocationId } = useLocationStore();

  const onDeleteLocation = (event: MouseEvent) => {
    event.stopPropagation();
    setSelectedLocationId(locationData.id);
    onOpenAlert();
  };

  return (
    <Location
      styledType="container"
      color={locationData.isSelected ? 'accentPrimary' : 'neutralTextWeak'}
      onClick={() => {
        onSelect(locationData.id);
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
