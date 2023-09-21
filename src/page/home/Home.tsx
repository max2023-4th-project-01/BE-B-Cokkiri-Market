import { useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { styled } from 'styled-components';
import { useGetItemData } from '../../api/queries/useItemQuery';
import { useResetLocationResult } from '../../api/queries/useLocationQuery';
import { Error } from '../../components/Error';
import { Header } from '../../components/Header';
import { Loader } from '../../components/Loader';
import { ProductItem } from '../../components/ProductItem';
import { Button } from '../../components/button/Button';
import { UserLocationDropdown } from '../../components/dropdown/UserLocationDropdown';
import { Icon } from '../../components/icon/Icon';
import { HomeLocationModal } from '../../components/locations/HomeLocationModal';
import { useAuthStore } from '../../stores/useAuthStore';
import { useProductEditorStore } from '../../stores/useProductEditorStore';
import { useToastStore } from '../../stores/useToastStore';
import { CategoryFilterPanel } from './CategoryFilterPanel';

export function Home() {
  const openEditorPanel = useProductEditorStore(state => state.openPanel);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [categoryId, setCategoryId] = useState<number>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenPanel, setIsOpenPanel] = useState(false);

  const { ref: observingTargetRef, inView } = useInView();
  const isLogin = useAuthStore(state => state.isLogin);
  const showToast = useToastStore(state => state.showToast);

  const {
    data: itemData,
    refetch: refetchItems,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
  } = useGetItemData(categoryId);
  const resetLocationResult = useResetLocationResult();

  useEffect(() => {
    if (categoryId) {
      setIsOpenPanel(false);
    }
  }, [categoryId]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    refetchItems();
    resetLocationResult();
    setIsModalOpen(false);
  };

  const openPanel = () => {
    setIsOpenPanel(true);
  };

  const closePanel = useCallback(() => {
    refetchItems();
    setIsOpenPanel(false);
  }, [refetchItems]);

  const selectCategory = useCallback((id: number) => {
    setCategoryId(id);
  }, []);

  const onLocationClick = () => {
    showToast({
      mode: 'warning',
      message: '동네설정은 로그인 후 가능합니다.',
    });
    return;
  };

  const clearCategory = () => {
    setCategoryId(undefined);
  };

  return (
    <Div>
      <CategoryFilterPanel
        isOpenPanel={isOpenPanel}
        closePanel={closePanel}
        selectCategory={selectCategory}
      />
      <Header
        leftButton={
          <LeftAccessory>
            {!isLogin ? (
              <Button
                styledType="text"
                color="neutralText"
                onClick={onLocationClick}
              >
                역삼1동
                <Icon name="chevronDown" color="neutralTextStrong" />
              </Button>
            ) : (
              <UserLocationDropdown
                currentLocation={itemData?.pages[0]?.userLocation}
                openModal={openModal}
              />
            )}
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
        title={
          itemData?.pages[0].categoryName ? (
            <>
              {itemData?.pages[0].categoryName}
              <Icon
                size={18}
                name="x"
                color="neutralBorderStrong"
                onClick={() => clearCategory()}
              />
            </>
          ) : undefined
        }
      />
      <Body ref={bodyRef} id="home--body__items">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {itemData?.pages.map(page =>
              page.items.map(item => {
                return (
                  <ProductItem
                    key={item.id}
                    {...item}
                    renderingPosition="home"
                  />
                );
              })
            )}
            <ObservingTarget ref={observingTargetRef} />
          </>
        )}
        {itemData?.pages[0].items.length === 0 && (
          <Error message="판매 상품이 없습니다." />
        )}
        {isError && <Error message="판매 상품 목록을 불러오지 못했습니다." />}
      </Body>
      {isModalOpen && (
        <HomeLocationModal isOpen={isModalOpen} onClose={closeModal} />
      )}
      {isLogin && (
        <FAB
          styledType="circle"
          color="accentPrimary"
          onClick={() => openEditorPanel({ mode: 'add' })}
        >
          <Icon name="plus" color="accentText" />
        </FAB>
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

const ObservingTarget = styled.div`
  height: 152px;
  position: relative;
  bottom: 152px;
`;

const FAB = styled(Button)`
  width: 56px;
  height: 56px;
  position: absolute;
  right: 24px;
  bottom: 88px;
`;
