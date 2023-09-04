import { useState } from 'react';
import { styled } from 'styled-components';
import {
  useGetUserLocation,
  useSelectUserLocation,
  useDeleteUserLocation,
} from '../../queries/useLocationQuery';
import { useLocationStore } from '../../stores/useLocationStore';
import { Alert } from '../Alert';
import { Button } from '../Button';
import { Error } from '../Error';
import { Loader } from '../Loader';
import { Icon } from '../icon/Icon';
import { LocationButton } from './LocationButton';

type SetLocationProps = {
  openSearchPanel: () => void;
};

export function SetLocation({ openSearchPanel }: SetLocationProps) {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const { selectedLocationId } = useLocationStore();

  const { data, isLoading, isError } = useGetUserLocation();
  const selectMutation = useSelectUserLocation();
  const deleteMutation = useDeleteUserLocation();

  if (isLoading) return <Loader />;
  if (isError) return <Error />;

  const isMaxLocations = data.locations?.length >= 2;

  const deleteLocation = (locationId: number) => {
    const isLastLocation = data.locations.length === 1;
    if (isLastLocation) {
      alert('최소 1개의 동네는 설정되어야 합니다.');
      return;
    }
    const shouldSelectAnotherLocation = data.locations.find(
      location => location.id === locationId
    )?.isSelected;

    deleteMutation.mutate(locationId);
    if (shouldSelectAnotherLocation) {
      const anotherLocation = data.locations.find(
        location => location.id !== locationId
      );
      anotherLocation && selectMutation.mutate(anotherLocation.id);
    }
  };

  return (
    <>
      {isError ? (
        <Error />
      ) : (
        <Content>
          <Notice>
            지역은 최소 1개,
            <br /> 최대 2개까지 설정 가능해요.
          </Notice>
          <Buttons>
            {data.locations.map((location, index) => (
              <LocationButton
                key={index}
                locationData={location}
                onOpenAlert={() => {
                  setIsAlertOpen(true);
                }}
              />
            ))}
            {!isMaxLocations && (
              <Button
                styledType="outline"
                color="neutralBorder"
                onClick={openSearchPanel}
              >
                <Plus>
                  <Icon name="plus" color="accentTextWeak" />
                  추가
                </Plus>
              </Button>
            )}
          </Buttons>
        </Content>
      )}
      {isAlertOpen && (
        <Alert
          isOpen={isAlertOpen}
          onClose={() => setIsAlertOpen(false)}
          onAction={() => {
            if (!selectedLocationId) {
              alert('삭제할 동네가 정상적으로 선택되지 않았습니다.');
              return;
            }
            deleteLocation(selectedLocationId);
          }}
        >
          동네를 삭제할까요?
        </Alert>
      )}
    </>
  );
}

const Content = styled.div`
  display: flex;
  padding: 40px 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  align-self: stretch;
  flex: 1;
`;

const Notice = styled.p`
  align-self: stretch;
  text-align: center;
  font: ${({ theme }) => theme.font.displayDefault12};
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;

const Plus = styled.div`
  width: 254px;
  height: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  align-self: stretch;
  font: ${({ theme }) => theme.font.availableStrong16};
  color: ${({ theme }) => theme.color.accentTextWeak};
`;
