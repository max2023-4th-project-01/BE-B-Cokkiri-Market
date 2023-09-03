import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef, useCallback } from 'react';
import { styled } from 'styled-components';
import { getLocationData } from '../../api/fetcher';
import { useAddUserLocation } from '../../queries/useLocationQuery';
import { Error } from '../Error';

type AddLocationProps = {
  rightPosition: number;
  showSearchPanel: () => void;
  closeSearchPanel: () => void;
  hideSearchPanel: () => void;
};

type PostData = {
  locations: {
    id: number;
    name: string;
  }[];
  nextId: number | null;
};

export function AddLocation({
  rightPosition,
  showSearchPanel,
  closeSearchPanel,
  hideSearchPanel,
}: AddLocationProps) {
  // const { data, isLoading, isError } = useGetLocationData();
  const {
    fetchNextPage, //function
    hasNextPage, // boolean
    isFetchingNextPage, // boolean
    data,
    error,
  } = useInfiniteQuery<PostData>(['/locations'], getLocationData, {
    getNextPageParam: lastPage => lastPage.nextId ?? undefined,
  });

  const intObserver = useRef<IntersectionObserver>();
  const lastPostRef = useCallback(
    (locationItem: HTMLLIElement) => {
      if (isFetchingNextPage) return;
      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver(posts => {
        if (posts[0].isIntersecting && hasNextPage) {
          console.log('마지막 요소 도달');
          fetchNextPage();
        }
      });

      if (locationItem) intObserver.current.observe(locationItem);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  const addMutation = useAddUserLocation();

  useEffect(() => {
    showSearchPanel();
  }, []);

  const onClickLocationItem = (locationName: string) => {
    console.log(intObserver.current);
    addMutation.mutate(locationName);
    hideSearchPanel();
  };

  const onTransitionEndHandler = () => {
    rightPosition !== 0 && closeSearchPanel();
  };

  if (error) return <Error />;

  return (
    <Container
      $rightPosition={rightPosition}
      onTransitionEnd={onTransitionEndHandler}
    >
      <SearchBar placeholder="동명(읍, 면)으로 검색 (ex. 서초동)" />
      <Content>
        {data?.pages.map(page => {
          return page.locations.map((location, index) =>
            index === page.locations.length - 1 ? (
              <LocationItem
                ref={lastPostRef}
                key={location.id}
                onClick={() => onClickLocationItem(location.name)}
              >
                {location.name}
              </LocationItem>
            ) : (
              <LocationItem
                key={location.id}
                onClick={() => onClickLocationItem(location.name)}
              >
                {location.name}
              </LocationItem>
            )
          );
        })}
        {isFetchingNextPage && <LoadingMessage>Loading...</LoadingMessage>}
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
  gap: 8px;
  padding: 0 24px 16px;
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
