import { useEffect } from 'react';
import { styled } from 'styled-components';

type AddLocationProps = {
  rightPosition: number;
  showSearchPanel: () => void;
  closeSearchPanel: () => void;
};

export function AddLocation({
  rightPosition,
  showSearchPanel,
  closeSearchPanel,
}: AddLocationProps) {
  useEffect(() => {
    showSearchPanel();
  }, []);

  const onTransitionEndHandler = () => {
    rightPosition !== 0 && closeSearchPanel();
  };

  return (
    <Container
      $rightPosition={rightPosition}
      onTransitionEnd={onTransitionEndHandler}
    >
      <SearchBar placeholder="동명(읍, 면)으로 검색 (ex. 서초동)" />
      <Content>
        <LocationItem>서울 강남구 개포1동</LocationItem>
        <LocationItem>서울 강남구 개포1동</LocationItem>
        <LocationItem>서울 강남구 개포1동</LocationItem>
        <LocationItem>서울 강남구 개포1동</LocationItem>
        <LocationItem>서울 강남구 개포1동</LocationItem>
        <LocationItem>서울 강남구 개포1동</LocationItem>
        <LocationItem>서울 강남구 개포1동</LocationItem>
        <LocationItem>서울 강남구 개포1동</LocationItem>
        <LocationItem>서울 강남구 개포1동</LocationItem>
        <LocationItem>서울 강남구 개포1동</LocationItem>
        <LocationItem>서울 강남구 개포1동</LocationItem>
        <LocationItem>서울 강남구 개포1동</LocationItem>
        <LocationItem>서울 강남구 개포1동</LocationItem>
      </Content>
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
  font: ${({ theme }) => theme.font.displayDefault16};
  background-color: ${({ theme }) => theme.color.neutralBackground};
`;

const SearchBar = styled.input`
  width: 288px;
  padding: 8px;
  border: none;
  border-radius: 8px;
  font: ${({ theme }) => theme.font.displayDefault16};
  background-color: ${({ theme }) => theme.color.neutralBackgroundBold};
`;

const Content = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  flex: 1;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const LocationItem = styled.li`
  display: flex;
  padding: 16px 0px 15px;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  align-self: stretch;
  border-bottom: 1px solid ${({ theme }) => theme.color.neutralBorder};
`;
