import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { styled } from 'styled-components';
import { useDebounceValue } from '../../hooks/useDebounceValue';
import {
  useAddUserLocation,
  useGetLocationResult,
} from '../../queries/useLocationQuery';
import { Error } from '../Error';
import { Loader } from '../Loader';

type AddLocationProps = {
  rightPosition?: number;
  showSearchPanel?: () => void;
  closeSearchPanel?: () => void;
  hideSearchPanel?: () => void;
  addLocation?: (locationId: number, locationName: string) => void;
};

export function AddLocation({
  rightPosition,
  showSearchPanel,
  closeSearchPanel,
  hideSearchPanel,
  addLocation,
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

  const addMutation = useAddUserLocation();
  const { ref: lastItemRef, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    showSearchPanel && showSearchPanel();
  }, []);

  const onClickLocationItem = (locationId: number, locationName: string) => {
    // SignUpPanel에서 사용하는 경우
    if (addLocation) {
      addLocation(locationId, locationName);
      return;
    }
    // Home에서 사용하는 경우
    addMutation.mutate({ locationId, locationName });
    hideSearchPanel && hideSearchPanel();
  };

  const onTransitionEndHandler = () => {
    rightPosition !== 0 && closeSearchPanel && closeSearchPanel();
  };

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
              return page.locations.map((location, index) => {
                const isLastItem = index === page.locations.length - 1;
                return (
                  <LocationItem
                    ref={isLastItem ? lastItemRef : null}
                    key={location.id}
                    onClick={() =>
                      onClickLocationItem(location.id, location.name)
                    }
                  >
                    {location.name}
                  </LocationItem>
                );
              });
            })
          )}
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
