import { ReactNode, MouseEvent, useState } from 'react';
import { styled, css } from 'styled-components';
import { useScrollLock } from '../../hooks/useScrollLock';
import { Button } from '../button/Button';
import { Icon } from '../icon/Icon';
import { IconsType } from '../icon/icons';

type DropdownProps = {
  text?: string;
  iconName: IconsType;
  gap: number;
  children: ReactNode;
};

export function Dropdown({ text, iconName, gap, children }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [lockScroll, unlockScroll] = useScrollLock();

  const onToggle = (event: MouseEvent) => {
    event.stopPropagation();
    setIsOpen(prev => {
      if (prev === false) {
        lockScroll();
        return true;
      } else {
        unlockScroll();
        return false;
      }
    });
  };

  const onClose = (event: MouseEvent) => {
    event.stopPropagation();
    unlockScroll();
    setIsOpen(false);
  };

  return (
    <>
      <StyledButton styledType="text" onClick={onToggle} $isOpen={isOpen}>
        <Text>{text}</Text>
        <Icon name={iconName} color="neutralTextStrong" />
      </StyledButton>
      {isOpen && (
        <Container $isOpen={isOpen} $gap={gap}>
          <Menus onClick={onClose}>{children}</Menus>
        </Container>
      )}
    </>
  );
}

const StyledButton = styled(Button)<{ $isOpen: boolean }>`
  ${({ $isOpen }) => {
    if ($isOpen) {
      return css`
        &::before {
          content: '';
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 10;
          background-color: ${({ theme }) => theme.color.neutralOverlay};
        }
      `;
    }
  }}
`;

const Text = styled.span`
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
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
