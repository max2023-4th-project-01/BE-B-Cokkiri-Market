import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { styled } from 'styled-components';
import { getItem } from '../api/fetcher';
import { ProductItem } from '../components/ProductItem';
import { Icon } from '../components/icon/Icon';

type ItemData = {
  userLocation: string;
  items: ItemProps[];
};

type ItemProps = {
  id: number;
  title: string;
  locationName: string;
  createdAt: Date;
  statusName: string;
  price: number | null;
  countData: {
    chat: number;
    favorite: number;
  };
  thumbnailUrl: string;
  isSeller: boolean;
};

export function Home() {
  const bodyRef = useRef<HTMLDivElement>(null);
  const {
    data: itemData,
    isLoading,
    isError,
  } = useQuery<ItemData, Error>(['items'], getItem);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred</div>;
  }
  return (
    <Div>
      <Header>
        <LeftAccessory>
          {itemData.userLocation}
          <Icon name="chevronDown" color="neutralTextStrong" />
        </LeftAccessory>
        <RightAccessory>
          <Icon name="layoutGrid" color="neutralTextStrong" />
        </RightAccessory>
      </Header>
      <Body ref={bodyRef}>
        <Test>
          {itemData.items.map((item, index) => {
            return <ProductItem key={index} {...item} />;
          })}
        </Test>
      </Body>
    </Div>
  );
}

const Test = styled.div`
  position: relative;
`;

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

const Header = styled.div`
  width: 100%;
  height: 56px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: ${({ theme }) => `0.8px solid ${theme.color.neutralBorder}`};
  font: ${({ theme }) => theme.font.displayStrong16};
  backdrop-filter: ${({ theme }) => theme.backdropFilter.blur};

  color: ${({ theme }) => theme.color.neutralTextStrong};
  z-index: 1;
`;

const LeftAccessory = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  flex: 1;
  gap: 8px;
  padding: 8px;
`;

const RightAccessory = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 8px;
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 16px;
  margin-top: 56px;
`;
