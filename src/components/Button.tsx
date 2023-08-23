import { ButtonHTMLAttributes } from 'react';
import { css, styled } from 'styled-components';
import { ColorType, designSystem } from '../styles/designSystem';
type type = 'container' | 'outline' | 'ghost' | 'circle';

type ButtonProps = {
  children?: React.ReactNode;
  type: type;
  color: ColorType;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, type, color, ...rest }: ButtonProps) {
  return (
    <StyledButton $type={type} $color={color} {...rest}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button<{
  $type: type;
  $color: ColorType;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;

  ${({ $type: $type, $color }) => typeToCss($type, $color)}
  cursor: pointer;
`;

const typeToCss = ($type: type, $color: ColorType) => {
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
    case 'ghost':
      return css`
        border: none;
        border-radius: 8px;
        background: none;
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
