import { useCallback, useState } from 'react';
import { styled } from 'styled-components';
import { useAddUserLocation } from '../../api/queries/useLocationQuery';
import { Modal } from '../Modal';
import { Button } from '../button/Button';
import { Icon } from '../icon/Icon';
import { AddLocation } from './AddLocation';
import { SetLocation } from './SetLocation';

type LocationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function HomeLocationModal({ isOpen, onClose }: LocationModalProps) {
  const [isAddLocation, setIsAddLocation] = useState(false);
  const [rightPosition, setRightPosition] = useState(-320);

  const addUserLocation = useAddUserLocation();

  const openSearchPanel = () => {
    setIsAddLocation(true);
  };

  const closeSearchPanel = () => {
    setIsAddLocation(false);
  };

  const showSearchPanel = useCallback(() => {
    setRightPosition(0);
  }, []);

  const hideSearchPanel = () => {
    setRightPosition(-320);
  };

  const onTransitionEndHandler = () => {
    rightPosition !== 0 && closeSearchPanel();
  };

  const clickLocationItem = (locationId: number, locationName: string) => {
    addUserLocation.mutate({ locationId, locationName });
    hideSearchPanel();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Header $rightPosition={rightPosition}>
        {rightPosition !== 0 ? (
          <Headline>동네 설정</Headline>
        ) : (
          <Button styledType="text" onClick={hideSearchPanel}>
            <Icon name="chevronLeft" color="neutralTextStrong" />
          </Button>
        )}
        <Button styledType="text" onClick={onClose}>
          <Icon name="x" color="neutralTextStrong" />
        </Button>
      </Header>
      <Body>
        <SetLocation openSearchPanel={openSearchPanel} />
        {isAddLocation && (
          <AddLocation
            rightPosition={rightPosition}
            showSearchPanel={showSearchPanel}
            onTransitionEndHandler={onTransitionEndHandler}
            clickLocationItem={clickLocationItem}
          />
        )}
      </Body>
    </Modal>
  );
}

const Header = styled.header<{ $rightPosition: number }>`
  min-height: 72px;
  display: flex;
  padding: 8px 8px 16px
    ${({ $rightPosition }) => ($rightPosition !== 0 ? '24px' : '8px')};
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  transition: padding 0.4s ease-in-out;
`;

const Headline = styled.h2`
  font: ${({ theme }) => theme.font.displayStrong20};
`;

const Body = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
