import { useState } from 'react';
import { css, styled } from 'styled-components';
import { Button } from './Button';
import { Icon } from './icon/Icon';

type DropdownProps = {};

export function Dropdown() {
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
        <Text>Dashboard</Text>
        <Icon name="chevronDown" color="neutralTextStrong" />
      </Button>
      {isOpen && <Backdrop />}
      {isOpen && (
        <Container $isOpen={isOpen}>
          <Menu>
            <MenuItem onClick={onClose}>역삼 1동</MenuItem>
            <MenuItem onClick={onClose}>역삼 2동</MenuItem>
            <MenuItem onClick={onClose}>내 동네 설정하기</MenuItem>
          </Menu>
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
const Menu = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const MenuItem = styled.li`
  width: 240px;
  display: flex;
  padding: 8px;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  padding: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.color.neutralBorder};
  font: ${({ theme }) => theme.font.availableDefault16};
  color: ${({ theme }) => theme.color.neutralTextStrong};

  &:first-child {
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }

  &:last-child {
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    border-bottom: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.color.neutralBackgroundBlur};
  }
`;
