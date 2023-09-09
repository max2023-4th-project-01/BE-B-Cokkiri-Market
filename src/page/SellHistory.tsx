import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { styled } from 'styled-components';
import { getSellHistory } from '../api/SellHistoryFetcher';
import { Badge, BadgeProps } from '../components/Badge';
import { Header } from '../components/Header';
import { ProductItem } from '../components/ProductItem';
import { useAuthStore } from '../stores/useAuthStore';
import { ItemProps } from '../types';

type HistoryData = {
  items: ItemProps[];
  nextCursor: number;
  hasNext: boolean;
};

export function SellHistory() {
  const { nickname } = useAuthStore();
  const [isSold, setIsSold] = useState<boolean>();
  const { data: historyData } = useQuery<HistoryData, Error>(
    ['history', isSold],
    () => getSellHistory({ nickname, isSold })
  );

  const setBadgeOption = (text: string, status: boolean | undefined) => {
    const isSelected = isSold === status;

    const options: BadgeProps = isSelected
      ? {
          text,
          badgeColor: 'accentPrimary',
          fontColor: 'accentText',
          size: 'M',
          type: 'container',
          onClick: () => setIsSold(status),
        }
      : {
          text,
          badgeColor: 'neutralBorder',
          fontColor: 'accentTextWeak',
          size: 'M',
          type: 'outline',
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
        {historyData ? (
          <>
            {historyData.items.map((item: ItemProps) => {
              return <ProductItem key={item.id} {...item} />;
            })}
          </>
        ) : (
          <div></div>
        )}
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
