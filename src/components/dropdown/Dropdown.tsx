import { ReactNode, useState } from 'react';
import { styled } from 'styled-components';
import { Button } from '../Button';
import { Icon } from '../icon/Icon';
import { IconsType } from '../icon/icons';
import { Backdrop } from './Backdrop';

type DropdownProps = {
  text?: string;
  iconName: IconsType;
  gap: number;
  children: ReactNode;
};

export function Dropdown({ text, iconName, gap, children }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button styledType="ghost" onClick={onToggle}>
        <Text>{text}</Text>
        <Icon name={iconName} color="neutralTextStrong" />
      </Button>
      {isOpen && (
        <Container $isOpen={isOpen} $gap={gap}>
          <Menus onClick={onClose}>{children}</Menus>
        </Container>
      )}
      {isOpen && <Backdrop />}
    </>
  );
}

const Text = styled.span`
  margin-right: 8px;
  font: ${({ theme }) => theme.font.availableStrong16};
  color: ${({ theme }) => theme.color.neutralText};
`;
// TODO: 드롭다운 position 값을 부모요소에 따라서 변경해야함
const Container = styled.div<{ $isOpen: boolean; $gap: number }>`
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.neutralBackground};
  position: absolute;
  top: ${({ $gap }) => $gap}px;
  z-index: 10;
`;
const Menus = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
