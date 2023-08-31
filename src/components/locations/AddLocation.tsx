import { styled } from 'styled-components';
import { Button } from '../Button';
import { Icon } from '../icon/Icon';

export function AddLocation({
  onClose,
  onCloseAddModal,
}: {
  onClose: () => void;
  onCloseAddModal: () => void;
}) {
  return (
    <>
      <Header>
        <Button styledType="ghost" onClick={onCloseAddModal}>
          <Icon name="chevronLeft" color="neutralTextStrong" />
        </Button>
        <Button styledType="ghost" onClick={onClose}>
          <Icon name="x" color="neutralTextStrong" />
        </Button>
      </Header>
      <SearchBar />
      <Content>지역들</Content>
    </>
  );
}

const Header = styled.header`
  min-height: 72px;
  display: flex;
  padding: 8px 8px 16px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const SearchBar = styled.input`
  display: flex;
  width: 288px;
  padding: 8px;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
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
