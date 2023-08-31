import { useEffect } from 'react';
import { styled } from 'styled-components';

type AddLocationProps = {
  rightPosition: number;
  setRightPosition: (rightPosition: number) => void;
  closeSearchPanel: () => void;
};

export function AddLocation({
  rightPosition,
  setRightPosition,
  closeSearchPanel,
}: AddLocationProps) {
  useEffect(() => {
    setRightPosition(0);
  }, []);

  const onTransitionEndHandler = () => {
    rightPosition !== 0 && closeSearchPanel();
  };

  return (
    <Container
      $rightPosition={rightPosition}
      onTransitionEnd={onTransitionEndHandler}
    >
      <SearchBar />
      <Content>지역들</Content>
    </Container>
  );
}

const Container = styled.div<{ $rightPosition: number }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 24px;
  position: absolute;
  top: 0;
  right: ${({ $rightPosition }) => `${$rightPosition}px`};
  transition: right 0.6s;
  background-color: ${({ theme }) => theme.color.neutralBackground};
`;

const SearchBar = styled.input`
  width: 288px;
  padding: 8px;
`;

const Content = styled.div`
  display: flex;
  padding: 40px 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  align-self: stretch;
  flex: 1;
`;
