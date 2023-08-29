import { useQueryClient, useMutation } from '@tanstack/react-query';
import { MouseEvent } from 'react';
import { styled } from 'styled-components';
import { selectUserLocation } from '../api/fetcher';
import { useLocationStore } from '../stores/useLocationStore';
import { LocationData } from '../types';
import { Button } from './Button';
import { Icon } from './icon/Icon';

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
  const queryClient = useQueryClient();
  const selectMutation = useMutation(selectUserLocation, {
    onSuccess: () => {
      queryClient.setQueryData<LocationData>(['locations'], prevData => {
        if (!prevData) return;
        return {
          locations: prevData.locations.map(location => ({
            ...location,
            isSelected: location.id === locationData.id,
          })),
        };
      });
      // queryClient.invalidateQueries(['todos']);
    },
  });

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
        selectMutation.mutate(locationData.id);
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
