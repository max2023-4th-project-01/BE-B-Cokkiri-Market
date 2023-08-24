import { css, styled } from 'styled-components';
import { ColorType } from '../styles/designSystem';

type Size = 'S' | 'M';

type BadgeType = 'container' | 'outline';

type BadgeProps = {
  fontColor: ColorType;
  badgeColor: ColorType;
  text: string;
  size: Size;
  type: BadgeType;
};

export function Badge({ fontColor, badgeColor, text, size, type }: BadgeProps) {
  return (
    <Div
      $fontColor={fontColor}
      $BadgeColor={badgeColor}
      $size={size}
      $type={type}
    >
      {text}
    </Div>
  );
}

const Div = styled.div<{
  $fontColor: ColorType;
  $BadgeColor: ColorType;
  $size: Size;
  $type: BadgeType;
}>`
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ $size }) => sizeToCss($size)};
  font: ${({ theme }) => theme.font.displayDefault12};
  ${({ $type, $BadgeColor }) => typeToCss($type, $BadgeColor)};
  color: ${({ theme, $fontColor: $color }) => theme.color[$color]};
`;

const sizeToCss = ($size: Size) => {
  switch ($size) {
    case 'S': {
      return css`
        padding: 3px 8px;
        border-radius: 8px;
      `;
    }
    case 'M': {
      return css`
        padding: 8px 16px;
        border-radius: 50px;
      `;
    }
    default:
      return '';
  }
};

const typeToCss = ($type: BadgeType, $BadgeColor: ColorType) => {
  switch ($type) {
    case 'container': {
      return css`
        background-color: ${({ theme }) => theme.color[$BadgeColor]};
        border: none;
      `;
    }
    case 'outline': {
      return css`
        border: ${({ theme }) => `1px solid ${theme.color[$BadgeColor]}`};
      `;
    }
    default:
      return '';
  }
};
