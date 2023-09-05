import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { styled } from 'styled-components';
import { getItem } from '../../api/fetcher';
import { Error } from '../../components/Error';
import { Header } from '../../components/Header';
import { ProductItem } from '../../components/ProductItem';
import { Dropdown } from '../../components/dropdown/Dropdown';
import { MenuItem } from '../../components/dropdown/MenuItem';
import { Icon } from '../../components/icon/Icon';
import { LocationModal } from '../../components/locations/LocationModal';
import { useGetUserLocation } from '../../queries/useLocationQuery';
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

  const { data: userLocationData } = useGetUserLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred</div>;
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

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
            <Dropdown
              text={itemData.userLocation}
              iconName="chevronDown"
              gap={56}
              align="left"
            >
              {userLocationData?.locations.map(location => {
                return (
                  <MenuItem
                    key={location.id}
                    onClick={() => {
                      console.log(`${location.name} 클릭됨`);
                    }}
                  >
                    {location.name}
                  </MenuItem>
                );
              })}
              <MenuItem onClick={openModal}>내 동네 설정하기</MenuItem>
            </Dropdown>
            {/* {itemData.userLocation}
            <Icon name="chevronDown" color="neutralTextStrong" /> */}
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
      <Body ref={bodyRef} id="home--body__items">
        {itemData.items.map(item => {
          return <ProductItem key={item.id} {...item} />;
        })}
        {itemData.items.length === 0 && (
          <Error message="판매 상품이 없습니다." />
        )}
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
