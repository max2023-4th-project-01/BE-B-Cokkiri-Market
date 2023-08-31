import { useState } from 'react';
import { styled } from 'styled-components';
import { Button } from '../Button';
import { Modal } from '../Modal';
import { Icon } from '../icon/Icon';
import { AddLocation } from './AddLocation';
import { SetLocation } from './SetLocation';

type LocationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function LocationModal({ isOpen, onClose }: LocationModalProps) {
  const [isAddLocation, setIsAddLocation] = useState(false);

  const onOpenAddModal = () => {
    setIsAddLocation(true);
  };

  const onCloseAddModal = () => {
    setIsAddLocation(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Header>
        {!isAddLocation ? (
          <Headline>동네 설정</Headline>
        ) : (
          <Button styledType="ghost" onClick={onCloseAddModal}>
            <Icon name="chevronLeft" color="neutralTextStrong" />
          </Button>
        )}
        <Button styledType="ghost" onClick={onClose}>
          <Icon name="x" color="neutralTextStrong" />
        </Button>
      </Header>
      {!isAddLocation ? (
        <SetLocation onOpenAddModal={onOpenAddModal} />
      ) : (
        <AddLocation />
      )}
    </Modal>
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
