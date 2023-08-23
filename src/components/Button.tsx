import { ButtonHTMLAttributes } from 'react';
import { css, styled } from 'styled-components';
import { ColorType, designSystem } from '../styles/designSystem';

type ButtonType = 'container' | 'outline' | 'ghost' | 'circle';

type ButtonPropsWithColor = {
  children?: React.ReactNode;
  type: Exclude<ButtonType, 'ghost'>;
  color: ColorType;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonPropsGhost = {
  children?: React.ReactNode;
  type: 'ghost';
} & ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonProps = ButtonPropsWithColor | ButtonPropsGhost;

export function Button({ children, type, color, ...rest }: ButtonProps) {
  return (
    <StyledButton
      $type={type}
      $color={type !== 'ghost' ? color : undefined}
      {...rest}
    >
      {children}
    </StyledButton>
  );
}

const typeToCss = ($type: ButtonType, $color?: ColorType) => {
  if ($type === 'ghost') {
    return css`
      border: none;
      border-radius: 8px;
      background: none;
    `;
  }

  if (!$color) return '';

  switch ($type) {
    case 'circle':
      return css`
        border: 1px solid ${designSystem.color[$color]};
        border-radius: 50%;
        background: ${designSystem.color[$color]};
      `;
    case 'container':
      return css`
        border: 1px solid ${designSystem.color[$color]};
        border-radius: 8px;
        background: ${designSystem.color[$color]};
      `;
    case 'outline':
      return css`
        border: 1px solid ${designSystem.color[$color]};
        border-radius: 8px;
        background: none;
      `;
    default:
      return '';
  }
};

const StyledButton = styled.button<{
  $type: ButtonType;
  $color?: ColorType;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;

  ${({ $type, $color }) => typeToCss($type, $color)}
  cursor: pointer;
`;
