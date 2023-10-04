import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { styled } from 'styled-components';
import { useGetSalesList } from '../api/queries/useItemQuery';
import { Badge, BadgeProps } from '../components/Badge';
import { Error } from '../components/Error';
import { Header } from '../components/Header';
import { Loader } from '../components/Loader';
import { ProductItem } from '../components/ProductItem';
import { useAuthStore } from '../stores/useAuthStore';
import { ItemBaseType } from '../types';

export type SalesListData = {
  items: ItemBaseType[];
  nextCursor: number;
};

export function SalesList() {
  const nickname = useAuthStore(state => state.nickname);
  const [isSold, setIsSold] = useState<boolean>();
  const { ref: observingTargetRef, inView } = useInView();

  const {
    data: salesListData,
    isError,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useGetSalesList({
    nickname,
    isSold,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const getBadgeOption = (text: string, status: boolean | undefined) => {
    const isSelected = isSold === status;

    const options: BadgeProps = {
      text,
      badgeColor: isSelected ? 'accentPrimary' : 'neutralBorder',
      fontColor: isSelected ? 'accentText' : 'accentTextWeak',
      size: 'M',
      type: isSelected ? 'container' : 'outline',
      onClick: () => setIsSold(status),
    };

    return options;
  };

  return (
    <Div>
      <TopBar>
        <Header title="판매 내역" />
        <Tabs>
          <Badge {...getBadgeOption('전체', undefined)} />
          <Badge {...getBadgeOption('판매 중', false)} />
          <Badge {...getBadgeOption('판매 완료', true)} />
        </Tabs>
      </TopBar>

      <Body>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {salesListData?.pages.map(page =>
              page.items.map(item => {
                return (
                  <ProductItem
                    key={item.id}
                    {...item}
                    isSeller={true}
                    renderingPosition="salesList"
                  />
                );
              })
            )}
            <ObservingTarget ref={observingTargetRef} />
          </>
        )}
        {salesListData?.pages[0].items.length === 0 && (
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
`;

const ObservingTarget = styled.div`
  height: 152px;
  position: relative;
  bottom: 152px;
  z-index: -1;
`;
