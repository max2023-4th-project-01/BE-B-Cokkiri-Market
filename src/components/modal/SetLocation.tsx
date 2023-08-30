import { useState } from 'react';
import { styled } from 'styled-components';
import { useDeleteLocation } from '../../queries/useLocationMutation';
import { useLocationQuery } from '../../queries/useLocationQuery';
import { useLocationStore } from '../../stores/useLocationStore';
import { Alert } from '../Alert';
import { Button } from '../Button';
import { Loader } from '../Loader';
import { LocationButton } from '../LocationButton';
import { Icon } from '../icon/Icon';

type SetLocationProps = {
  onClose: () => void;
  onOpenAddModal: () => void;
};

export function SetLocation({ onClose, onOpenAddModal }: SetLocationProps) {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const { selectedLocationId } = useLocationStore();

  const { data, isLoading, isError } = useLocationQuery();
  const deleteMutation = useDeleteLocation();

  if (isLoading) return <Loader />;
  if (isError) return <div>에러 발생!</div>;

  const isMaxLocations = data.locations?.length >= 2;

  const deleteLocation = (locationId: number) => {
    if (data.locations.length === 1) {
      alert('최소 1개의 동네는 설정되어야 합니다.');
      return;
    }
    deleteMutation.mutate(locationId);
  };

  return (
    <>
      <Header>
        <Headline>동네 설정</Headline>
        <Button styledType="ghost" onClick={onClose}>
          <Icon name="x" color="neutralTextStrong" />
        </Button>
      </Header>
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
              onClick={onOpenAddModal}
            >
              <Plus>
                <Icon name="plus" color="accentTextWeak" />
                추가
              </Plus>
            </Button>
          )}
        </Buttons>
      </Content>
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

const Header = styled.header`
  min-height: 72px;
  display: flex;
  padding: 8px 8px 16px 24px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const Headline = styled.h2`
  font: ${({ theme }) => theme.font.displayStrong20};
`;

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
