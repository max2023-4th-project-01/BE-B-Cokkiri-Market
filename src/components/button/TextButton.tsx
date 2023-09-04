import { ButtonHTMLAttributes } from 'react';
import { css, styled } from 'styled-components';
import { ColorType } from '../../styles/designSystem';
import { Size } from './Button2';

type TextButtonProps = {
  children: React.ReactNode;
  size: Size;
  fontColor: ColorType;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function TextButton({ children, fontColor, size }: TextButtonProps) {
  return (
    <StyledButton $size={size} $fontColor={fontColor}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button<{ $size: Size; $fontColor: ColorType }>`
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  color: ${({ theme, $fontColor }) => theme.color[$fontColor]};
  ${({ $size }) => sizeToCss($size)};
`;

const sizeToCss = ($size: Size) => {
  switch ($size) {
    case 'L': {
      return css`
        height: 40px;
        font: ${({ theme }) => theme.font.availableStrong16};
      `;
    }
    case 'M': {
      return css`
        height: 32px;
        font: ${({ theme }) => theme.font.availableStrong12};
      `;
    }
    case 'S': {
      return css`
        height: 24px;
        font: ${({ theme }) => theme.font.availableStrong10};
      `;
    }
    default:
      return '';
  }
};
