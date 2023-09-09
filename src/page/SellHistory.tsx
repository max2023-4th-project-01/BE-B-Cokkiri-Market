import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { styled } from 'styled-components';
import { getSellHistory } from '../api/SellHistoryFetcher';
import { Badge, BadgeProps } from '../components/Badge';
import { Error } from '../components/Error';
import { Header } from '../components/Header';
import { Loader } from '../components/Loader';
import { ProductItem } from '../components/ProductItem';
import { useAuthStore } from '../stores/useAuthStore';
import { ItemBaseType } from '../types';

type HistoryData = {
  items: ItemBaseType[];
  nextCursor: number;
};

export function SellHistory() {
  const { nickname } = useAuthStore();
  const [isSold, setIsSold] = useState<boolean>();
  const {
    data: historyData,
    isLoading,
    isError,
  } = useQuery<HistoryData, Error>(['history', isSold], () =>
    getSellHistory({ nickname, isSold })
  );

  // 무한 스크롤 구현
  const setBadgeOption = (text: string, status: boolean | undefined) => {
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
          <Badge {...setBadgeOption('전체', undefined)} />
          <Badge {...setBadgeOption('판매 중', true)} />
          <Badge {...setBadgeOption('판매 완료', false)} />
        </Tabs>
      </TopBar>

      <Body>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {historyData?.items.map((item: ItemBaseType) => {
              return <ProductItem key={item.id} {...item} isSeller={true} />;
            })}
          </>
        )}
        {historyData?.items.length === 0 && (
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
