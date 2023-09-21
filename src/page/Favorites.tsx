import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { styled } from 'styled-components';
import {
  useGetFavorites,
  useGetFavoritesCategoryData,
} from '../api/queries/useItemQuery';
import { Badge, BadgeProps } from '../components/Badge';
import { Error } from '../components/Error';
import { Header } from '../components/Header';
import { Loader } from '../components/Loader';
import { ProductItem } from '../components/ProductItem';
import { FavoritesCategoryTabsType } from '../types';

export function Favorites() {
  const [categoryTabs, setCategoryTabs] = useState<FavoritesCategoryTabsType[]>(
    [{ name: '전체' }]
  );
  const [selectedCategory, setSelectedCategory] = useState<number>();
  const { ref: observingTargetRef, inView } = useInView();

  const { data: categoryData } = useGetFavoritesCategoryData();
  const {
    data: favoritesData,
    isError,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useGetFavorites(selectedCategory);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    categoryData &&
      setCategoryTabs([{ name: '전체' }, ...categoryData.categories]);
  }, [categoryData]);

  const handleWheelEvent = (event: React.WheelEvent<HTMLDivElement>) => {
    const element = event.currentTarget;
    element.scrollLeft += event.deltaY;
  };

  const getBadgeOption = (categoryTab: FavoritesCategoryTabsType) => {
    const isSelected = categoryTab.id === selectedCategory;

    const options: BadgeProps = {
      text: categoryTab.name,
      badgeColor: isSelected ? 'accentPrimary' : 'neutralBorder',
      fontColor: isSelected ? 'accentText' : 'accentTextWeak',
      size: 'M',
      type: isSelected ? 'container' : 'outline',
      onClick: () => setSelectedCategory(categoryTab.id),
    };

    return options;
  };

  return (
    <Div>
      <TopBar>
        <Header title="관심 목록" />
        <Tabs onWheel={handleWheelEvent}>
          {categoryTabs.map((categoryTab: FavoritesCategoryTabsType, index) => {
            return <Badge key={index} {...getBadgeOption(categoryTab)} />;
          })}
        </Tabs>
      </TopBar>
      <Body>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {favoritesData?.pages.map(page =>
              page.items.map(item => {
                return (
                  <ProductItem
                    key={item.id}
                    {...item}
                    renderingPosition="favorites"
                  />
                );
              })
            )}
            <ObservingTarget ref={observingTargetRef} />
          </>
        )}
        {favoritesData?.pages[0].items.length === 0 && (
          <Error message="판매 내역이 없습니다." />
        )}
        {isError && <Error message="판매 내역을 불러오지 못했습니다." />}
      </Body>
    </Div>
  );
}

const Div = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const TopBar = styled.div`
  width: 100%;
  position: absolute;
  z-index: 1;
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 16px;
  margin-top: 95px;
`;

const Tabs = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  position: relative;
  gap: 4px;
  padding: 8px 16px;
  margin-top: 56px;
  border-bottom: ${({ theme }) => `0.8px solid ${theme.color.neutralBorder}`};
  background-color: ${({ theme }) => theme.color.accentText};
  backdrop-filter: ${({ theme }) => theme.backdropFilter.blur};
  overflow-y: hidden;
  overflow-x: scroll;
  white-space: nowrap;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.color.neutralBorderStrong};
    border-radius: 10px;
  }
`;

const ObservingTarget = styled.div`
  height: 152px;
  position: relative;
  bottom: 152px;
`;
