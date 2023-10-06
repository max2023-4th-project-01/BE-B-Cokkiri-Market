import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { styled } from 'styled-components';
import { useGetLocationResult } from '../../api/queries/useLocationQuery';
import { useDebounceValue } from '../../hooks/useDebounceValue';
import { Error } from '../Error';
import { Loader } from '../Loader';

type AddLocationProps = {
  rightPosition?: number;
  showSearchPanel?: () => void;
  onTransitionEndHandler?: () => void;
  clickLocationItem: (locationId: number, locationName: string) => void;
};

export function AddLocation({
  rightPosition,
  showSearchPanel,
  onTransitionEndHandler,
  clickLocationItem,
}: AddLocationProps) {
  const [inputValue, setInputValue] = useState('');
  const query = useDebounceValue(inputValue, 500);

  const {
    data: locationData,
    isError,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetLocationResult(query);

  const { ref: observingTargetRef, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    showSearchPanel && showSearchPanel();
  }, [showSearchPanel]);

  const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <Container
      $rightPosition={rightPosition}
      onTransitionEnd={onTransitionEndHandler}
    >
      <SearchBar
        placeholder="동명(읍, 면)으로 검색 (ex. 서초동)"
        onChange={onChangeInputValue}
      />
      {isError ? (
        <Error />
      ) : (
        <Content>
          {isLoading ? (
            <Loader />
          ) : (
            locationData?.pages.map(page => {
              return page.locations.map(location => {
                return (
                  <LocationItem
                    key={location.id}
                    onClick={() =>
                      clickLocationItem(location.id, location.name)
                    }
                  >
                    {location.name}
                  </LocationItem>
                );
              });
            })
          )}
          <ObservingTarget ref={observingTargetRef} />
          {isFetchingNextPage && <LoadingMessage>Loading...</LoadingMessage>}
        </Content>
      )}
    </Container>
  );
}

const Container = styled.div<{ $rightPosition?: number }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 0 24px 16px;
  position: absolute;
  top: 0;
  ${({ $rightPosition }) =>
    $rightPosition !== undefined && `right: ${$rightPosition}px`};
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
  outline-color: ${({ theme }) => theme.color.accentPrimary};
`;

const Content = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  flex: 1;
  overflow-y: scroll;
  position: relative;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.color.neutralBorderStrong};
    border-radius: 10px;
  }
`;

const LocationItem = styled.li`
  display: flex;
  padding: 16px 0px 15px;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  align-self: stretch;
  border-bottom: 1px solid ${({ theme }) => theme.color.neutralBorder};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color.neutralBackgroundBold};
  }
`;

const LoadingMessage = styled.li`
  padding: 16px 0px 15px;
  margin: 0 auto;
`;

const ObservingTarget = styled.div`
  height: 56px;
  position: relative;
  bottom: 10%;
  z-index: -1;
`;
