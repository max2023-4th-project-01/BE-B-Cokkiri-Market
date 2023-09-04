import { ButtonHTMLAttributes } from 'react';
import { css, styled } from 'styled-components';
import { ColorType, designSystem } from '../../styles/designSystem';
import { TextButton } from './TextButton';

type ButtonType = 'container' | 'outline' | 'circle' | 'text';

export type Size = 'S' | 'M' | 'L';

type Align = 'center' | 'space-between';

type ButtonProps = {
  children: React.ReactNode;
  styledType?: ButtonType;
  color?: ColorType;
  fontColor?: ColorType;
  size?: Size;
  align?: Align;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  styledType = 'container',
  color = 'accentTextWeak',
  fontColor = 'accentTextWeak',
  size = 'L',
  align = 'center',
  ...rest
}: ButtonProps) {
  const isDisabled = rest.disabled;

  return (
    <>
      {styledType === 'text' ? (
        <TextButton
          size={size}
          fontColor={fontColor}
          isDisabled={isDisabled}
          {...rest}
        >
          {children}
        </TextButton>
      ) : (
        <StyledButton
          $size={size}
          $type={styledType}
          $color={color}
          $fontColor={fontColor}
          $align={align}
          $isDisabled={isDisabled}
          {...rest}
        >
          {children}
        </StyledButton>
      )}
    </>
  );
}

const StyledButton = styled.button<{
  $size: Size;
  $type: ButtonType;
  $color: ColorType;
  $fontColor: ColorType;
  $align: Align;
  $isDisabled?: boolean;
}>`
  ${({ $type, $size }) => sizeToCss($type, $size)}
  display: flex;
  align-items: center;
  justify-content: ${({ $align }) => $align};
  gap: 4px;
  color: ${({ theme, $fontColor }) => theme.color[$fontColor]};
  ${({ $type, $color }) => typeToCss($type, $color)};
  ${({ $isDisabled }) => $isDisabled && `opacity: 0.32;`}
  cursor: pointer;
`;

const sizeToCss = ($type: ButtonType, $size: Size) => {
  switch ($size) {
    case 'L': {
      return css`
        width: ${$type === 'circle' ? '56px' : '100%'};
        height: 56px;
        font: ${({ theme }) => theme.font.availableStrong16};
      `;
    }

    case 'M': {
      return css`
        width: ${$type === 'circle' ? '32px' : 'auto'};
        height: 32px;
        font: ${({ theme }) => theme.font.availableStrong12};
      `;
    }
    case 'S': {
      return css`
        width: ${$type === 'circle' ? '16px' : 'auto'};
        height: 16px;
      `;
    }
    default:
      return '';
  }
};

const typeToCss = ($type: ButtonType, $color: ColorType) => {
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
