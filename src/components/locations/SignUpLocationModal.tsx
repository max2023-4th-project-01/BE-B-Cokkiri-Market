import { styled } from 'styled-components';
import { Modal } from '../Modal';
import { Button } from '../button/Button';
import { Icon } from '../icon/Icon';
import { AddLocation } from './AddLocation';

type LocationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSetSignUpLocation: (locationId: number, locationName: string) => void;
};

export function SignUpLocationModal({
  isOpen,
  onClose,
  onSetSignUpLocation,
}: LocationModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Header>
        <Headline>동네 추가</Headline>
        <Button styledType="text" onClick={onClose}>
          <Icon name="x" color="neutralTextStrong" />
        </Button>
      </Header>
      <Body>
        <AddLocation clickLocationItem={onSetSignUpLocation} />
      </Body>
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
