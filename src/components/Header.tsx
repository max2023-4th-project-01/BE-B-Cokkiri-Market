import { ReactElement } from 'react';
import { styled } from 'styled-components';

type HeaderProps = {
  leftButton?: ReactElement;
  rightButton?: ReactElement;
  title?: string;
};

export function Header({
  leftButton,
  rightButton,
  title,
  ...rest
}: HeaderProps) {
  return (
    <Div {...rest}>
      <Left>{leftButton}</Left>
      <Title>{title}</Title>
      <Right>{rightButton}</Right>
    </Div>
  );
}

const Div = styled.div`
  width: 100%;
  height: 56px;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: ${({ theme }) => `0.8px solid ${theme.color.neutralBorder}`};
  font: ${({ theme }) => theme.font.displayStrong16};
  color: ${({ theme }) => theme.color.neutralTextStrong};
  background-color: ${({ theme }) => theme.color.neutralBackgroundBlur};
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    backdrop-filter: ${({ theme }) => theme.backdropFilter.blur};
  }
`;

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
