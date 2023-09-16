import { ReactNode } from 'react';
import { styled } from 'styled-components';
import { ColorType } from '../../styles/designSystem';

type MenuItemProps = {
  children: ReactNode;
  color?: ColorType;
  isSelected?: boolean;
  onAction: () => void;
};

export function MenuItem({
  children,
  color = 'neutralTextStrong',
  isSelected = false,
  onAction,
}: MenuItemProps) {
  return (
    <Item $color={color} $isSelected={isSelected} onClick={onAction}>
      {children}
    </Item>
  );
}

const Item = styled.li<{
  $color: ColorType;
  $isSelected: boolean;
}>`
  width: 240px;
  display: flex;
  padding: 8px;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  padding: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.color.neutralBorder};
  font: ${({ theme, $isSelected }) =>
    $isSelected ? theme.font.enabledStrong16 : theme.font.availableDefault16};
  color: ${({ theme, $color }) => theme.color[$color]};

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
