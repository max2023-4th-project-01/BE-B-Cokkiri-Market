import { ButtonHTMLAttributes } from 'react';
import { css, styled } from 'styled-components';
import { ColorType, designSystem } from '../styles/designSystem';

type ButtonType = 'container' | 'outline' | 'ghost' | 'circle';

type ButtonPropsWithColor = {
  children?: React.ReactNode;
  styledType: Exclude<ButtonType, 'ghost'>;
  color: ColorType;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonPropsGhost = {
  children?: React.ReactNode;
  styledType: 'ghost';
} & ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonProps = ButtonPropsWithColor | ButtonPropsGhost;

export function Button({ children, styledType, color, ...rest }: ButtonProps) {
  return (
    <StyledButton
      $type={styledType}
      $color={styledType !== 'ghost' ? color : undefined}
      {...rest}
    >
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button<{
  $type: ButtonType;
  $color?: ColorType;
}>`
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ $type, $color }) => typeToCss($type, $color)}
  cursor: pointer;
`;

const typeToCss = ($type: ButtonType, $color?: ColorType) => {
  if ($type === 'ghost') {
    return css`
      padding: 8px;
      border: none;
      border-radius: 8px;
      background: none;
    `;
  }

  if (!$color) return '';

  switch ($type) {
    case 'circle':
      return css`
        padding: 10px;
        border: 1px solid ${designSystem.color[$color]};
        border-radius: 50%;
        background: ${designSystem.color[$color]};
      `;
    case 'container':
      return css`
        padding: 16px;
        border: 1px solid ${designSystem.color[$color]};
        border-radius: 8px;
        background: ${designSystem.color[$color]};
      `;
    case 'outline':
      return css`
        padding: 16px;
        border: 1px solid ${designSystem.color[$color]};
        border-radius: 8px;
        background: none;
      `;
    default:
      return '';
  }
};
