import { MouseEvent } from 'react';
import { styled } from 'styled-components';
import { useSelectUserLocation } from '../../queries/useLocationQuery';
import { useLocationStore } from '../../stores/useLocationStore';
import { Button } from '../Button';
import { Icon } from '../icon/Icon';

type LocationButtonProps = {
  locationData: {
    id: number;
    name: string;
    isSelected: boolean;
  };
  onOpenAlert: () => void;
};

export function LocationButton({
  locationData,
  onOpenAlert,
}: LocationButtonProps) {
  const { setSelectedLocationId } = useLocationStore();
  const selectMutation = useSelectUserLocation();

  const onDeleteLocation = (event: MouseEvent) => {
    event.stopPropagation();
    setSelectedLocationId(locationData.id);
    onOpenAlert();
  };

  const onClickLocation = () => {
    if (locationData.isSelected) return;
    selectMutation.mutate(locationData.id);
  };

  return (
    <Location
      styledType="container"
      color={locationData.isSelected ? 'accentPrimary' : 'neutralTextWeak'}
      onClick={onClickLocation}
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
