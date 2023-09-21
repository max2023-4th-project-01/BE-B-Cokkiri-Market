import { ReactElement } from 'react';
import { css, styled } from 'styled-components';

type HeaderProps = {
  leftButton?: ReactElement;
  rightButton?: ReactElement;
  title?: string;
  type?: 'default' | 'dynamic';
};

export function Header({
  leftButton,
  rightButton,
  title,
  type = 'default',
}: HeaderProps) {
  return (
    <Div $type={type}>
      <Left>{leftButton}</Left>
      <Title>{title}</Title>
      <Right>{rightButton}</Right>
    </Div>
  );
}

const Div = styled.div<{ $type: 'default' | 'dynamic' }>`
  width: 100%;
  height: 56px;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: ${({ theme, $type }) =>
    $type === 'dynamic' ? 'none' : `0.8px solid ${theme.color.neutralBorder}`};
  font: ${({ theme }) => theme.font.displayStrong16};
  color: ${({ theme }) => theme.color.neutralTextStrong};
  background-color: ${({ theme, $type }) =>
    $type === 'dynamic' ? 'transparent' : theme.color.neutralBackgroundBlur};
  z-index: 1;

  ${({ $type }) => backdropFilterToCss($type)};
`;

const backdropFilterToCss = ($type: 'default' | 'dynamic') => {
  if ($type === 'default') {
    return css`
      &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -1;
        backdrop-filter: ${({ theme }) => theme.backdropFilter.blur};
      }
    `;
  } else {
    return css``;
  }
};

const Side = styled.div`
  min-width: 78px;
  width: auto;
  height: 56px;
  display: flex;
  align-items: center;
`;

const Left = styled(Side)`
  justify-content: left;
`;

const Right = styled(Side)`
  justify-content: right;
`;

const Title = styled.div`
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex: 1;
  font: ${({ theme }) => theme.font.displayStrong16};
  color: ${({ theme }) => theme.color.neutralTextStrong};
`;
