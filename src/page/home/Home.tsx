import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { styled } from 'styled-components';
import { getItem } from '../../api/fetcher';
import { Header } from '../../components/Header';
import { ProductItem } from '../../components/ProductItem';
import { Icon } from '../../components/icon/Icon';
import { LocationModal } from '../../components/locations/LocationModal';
import { CategoryFilterPanel } from './CategoryFilterPanel';

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
  const [isOpenPanel, setIsOpenPanel] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openPanel = () => {
    setIsOpenPanel(true);
  };

  const closePanel = () => {
    setIsOpenPanel(false);
  };

  return (
    <Div>
      {isOpenPanel && <CategoryFilterPanel closePanel={closePanel} />}
      <Header
        leftButton={
          <LeftAccessory>
            {itemData.userLocation}
            <Icon name="chevronDown" color="neutralTextStrong" />
          </LeftAccessory>
        }
        rightButton={
          <RightAccessory>
            <Icon
              name="layoutGrid"
              color="neutralTextStrong"
              onClick={openPanel}
            />
          </RightAccessory>
        }
      />
      <Body ref={bodyRef}>
        {itemData.items.map((item, index) => {
          return <ProductItem key={index} {...item} />;
        })}
      </Body>
      {isModalOpen && (
        <LocationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
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

const LeftAccessory = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  flex: 1;
  gap: 8px;
  padding: 8px;
  cursor: pointer;
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
