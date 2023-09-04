import { ReactNode, useState } from 'react';
import { styled } from 'styled-components';
import { Button } from '../Button';
import { Icon } from '../icon/Icon';
import { IconsType } from '../icon/icons';

type DropdownProps = {
  text?: string;
  iconName: IconsType;
  children: ReactNode;
};

export function Dropdown({ text, iconName, children }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button styledType="ghost" onClick={onClick}>
        <Text>{text}</Text>
        <Icon name={iconName} color="neutralTextStrong" />
      </Button>
      {isOpen && <Backdrop />}
      {isOpen && (
        <Container $isOpen={isOpen}>
          <Menus onClick={onClose}>{children}</Menus>
        </Container>
      )}
    </>
  );
}

const Text = styled.span`
  margin-right: 8px;
  font: ${({ theme }) => theme.font.availableStrong16};
  color: ${({ theme }) => theme.color.neutralText};
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: ${({ theme }) => theme.color.neutralOverlay};
`;

const Container = styled.div<{ $isOpen: boolean }>`
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.neutralBackground};
  position: absolute;
  z-index: 2;
`;
const Menus = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
