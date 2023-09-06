import { MouseEvent, ReactNode, useEffect, useState } from 'react';
import { css, styled } from 'styled-components';
import { useScrollLock } from '../../hooks/useScrollLock';
import { Button } from '../button/Button';
import { Icon } from '../icon/Icon';
import { IconsType } from '../icon/icons';

type DropdownProps = {
  children: ReactNode;
  btnText?: string;
  iconName: IconsType;
  align?: 'left' | 'right';
};

export function Dropdown({
  children,
  btnText,
  iconName,
  align = 'left',
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [lockScroll, unlockScroll] = useScrollLock('home--body__items');

  useEffect(() => {
    if (isOpen) {
      lockScroll();
    }
    return () => {
      unlockScroll();
    };
  }, [isOpen, lockScroll, unlockScroll]);

  const onToggle = (event: MouseEvent) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const onClose = (event: MouseEvent) => {
    event.stopPropagation();
    unlockScroll();
    setIsOpen(false);
  };

  return (
    <div>
      <StyledButton styledType="text" onClick={onToggle} $isOpen={isOpen}>
        {btnText && <Text>{btnText}</Text>}
        <Icon name={iconName} color="neutralTextStrong" />
      </StyledButton>
      {isOpen && (
        <Container $isOpen={isOpen} $align={align}>
          <Menus onClick={onClose}>{children}</Menus>
        </Container>
      )}
    </div>
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

const Container = styled.div<{
  $isOpen: boolean;
  $align: string;
}>`
  border-radius: 12px;
  position: absolute;
  right: ${({ $align }) => ($align === 'right' ? 0 : 'auto')};
  z-index: 10;
  background-color: ${({ theme }) => theme.color.neutralBackground};
`;

const Menus = styled.ul`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
