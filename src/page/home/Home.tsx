import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { styled } from 'styled-components';
import { Error } from '../../components/Error';
import { Header } from '../../components/Header';
import { ProductItem } from '../../components/ProductItem';
import { Dropdown } from '../../components/dropdown/Dropdown';
import { MenuItem } from '../../components/dropdown/MenuItem';
import { Icon } from '../../components/icon/Icon';
import { HomeLocationModal } from '../../components/locations/HomeLocationModal';
import { useGetItemData } from '../../queries/useItemQuery';
import { useGetUserLocation } from '../../queries/useLocationQuery';
import { CategoryFilterPanel } from './CategoryFilterPanel';

export function Home() {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [categoryId, setCategoryId] = useState<number>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenPanel, setIsOpenPanel] = useState(false);
  const { ref: lastItemRef } = useInView();

  // useEffect에서 useInView 훅으로 무한스크롤 요청 구현 예정
  // 선택된 categoryId 를 인자로 전달해서 카테고리 품목 필터링

  const { data: itemData, refetch } = useGetItemData(categoryId ?? null);
  const { data: userLocationData, isLoading, isError } = useGetUserLocation();

  useEffect(() => {
    if (categoryId) {
      setIsOpenPanel(false);
    }
  }, [categoryId]);

  // TODO : 로딩, 에러 페이지 중간에 return이 아닌 jsx 내에서 처리하기
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred</div>;
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    refetch();
    setIsModalOpen(false);
  };

  const openPanel = () => {
    setIsOpenPanel(true);
  };

  // CategroyPanel 수리중...
  const closePanel = () => {
    setIsOpenPanel(false);
  };

  const selectCategory = (id: number) => {
    setCategoryId(id);
  };

  return (
    <Div>
      <CategoryFilterPanel
        isOpenPanel={isOpenPanel}
        closePanel={closePanel}
        selectCategory={selectCategory}
      />
      {itemData && (
        <>
          <Header
            leftButton={
              <LeftAccessory>
                <Dropdown
                  btnText={itemData?.pages[0]?.userLocation || '역삼1동'}
                  iconName="chevronDown"
                  align="left"
                >
                  {userLocationData?.locations?.map(location => {
                    return (
                      <MenuItem
                        key={location.id}
                        font={
                          location.isSelected
                            ? 'enabledStrong16'
                            : 'availableDefault16'
                        }
                        onAction={() => {
                          console.log(`${location.name} 클릭됨`);
                        }}
                      >
                        {location.name}
                      </MenuItem>
                    );
                  })}
                  <MenuItem onAction={openModal}>내 동네 설정하기</MenuItem>
                </Dropdown>
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
            {itemData?.pages?.map(page => {
              return page?.items?.map((item, index) => {
                const isLastItem = index === page.items.length - 1;
                return (
                  <ProductItem
                    ref={isLastItem ? lastItemRef : null}
                    key={item.id}
                    {...item}
                  />
                );
              });
            })}
            {itemData?.pages[0]?.items?.length === 0 && (
              <Error message="판매 상품이 없습니다." />
            )}
          </Body>
        </>
      )}
      {isModalOpen && (
        <HomeLocationModal isOpen={isModalOpen} onClose={closeModal} />
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
