import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import {
  useGetItemDetails,
  useGetItemDetailsEdit,
  usePatchFavorite,
  usePatchStatus,
} from '../api/queries/useItemDetailsQuery';
import { useDeleteItem } from '../api/queries/useItemQuery';
import { Alert } from '../components/Alert';
import { Error } from '../components/Error';
import { Header } from '../components/Header';
import { Loader } from '../components/Loader';
import { Button } from '../components/button/Button';
import { Dropdown } from '../components/dropdown/Dropdown';
import { MenuItem } from '../components/dropdown/MenuItem';
import { Icon } from '../components/icon/Icon';
import { ImageSlider } from '../components/itemDetails/ImageSlider';
import { useProductEditorStore } from '../stores/useProductEditorStore';
import { useToastStore } from '../stores/useToastStore';
import { getElapsedSince } from '../utils/getElapsedSince';

type DetailsStatus = '판매중' | '예약중' | '판매완료';

export type ItemDetailsData = {
  isSeller: boolean;
  images: { id: number; url: string }[];
  seller: string;
  status: { name: DetailsStatus; isSelected: boolean }[];
  title: string;
  categoryName: string;
  createdAt: Date;
  content: string;
  countData: {
    chat: number;
    favorite: number;
    view: number;
  };
  isFavorite: boolean;
  price: number;
};

export function ItemDetails() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { itemId } = useParams();
  const {
    data: itemDetailsEditData,
    isError: isErrorEdit,
    isLoading: isLoadingEdit,
    refetch: refetchEdit,
  } = useGetItemDetailsEdit(Number(itemId));
  const openEditorPanel = useProductEditorStore(state => state.openPanel);
  const showToast = useToastStore(state => state.showToast);

  const {
    data: itemDetailsData,
    isLoading,
    isError,
  } = useGetItemDetails(Number(itemId));
  const favoriteMutation = usePatchFavorite();
  const statusMutation = usePatchStatus();
  const deleteMutation = useDeleteItem();
  const navigate = useNavigate();

  const openEditPanel = () => {
    if (!itemDetailsEditData || isLoadingEdit) {
      showToast({
        type: 'warning',
        message: '문제가 생겼습니다. 다시 시도해 주세요!',
      });
      return;
    } else if (isErrorEdit || !itemId) {
      showToast({
        type: 'error',
        message: '에러 발생!',
      });
      return;
    }
    openEditorPanel({
      mode: 'edit',
      data: itemDetailsEditData,
      id: Number(itemId),
    });
  };

  const setPrice = (price: number | null) => {
    switch (price) {
      case null:
        return '가격 미정';
      case 0:
        return '나눔';
      default:
        return `${price.toLocaleString('ko')}원`;
    }
  };

  const hoverToFetch = () => {
    if (!itemDetailsEditData && !isErrorEdit) {
      refetchEdit();
    }
  };

  // TODO: 페이지 로딩 시 스켈레톤 UI 추가 예정
  if (isLoading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  }

  if (isError) {
    return (
      <Wrapper>
        <Error />
      </Wrapper>
    );
  }

  const toggleFavorites = () => {
    favoriteMutation.mutate({
      itemId: Number(itemId),
      isFavorite: !itemDetailsData.isFavorite,
    });
  };

  const editStatus = (statusName: DetailsStatus) => {
    const prevStatusName = itemDetailsData.status.find(item => item.isSelected)
      ?.name;
    if (prevStatusName === statusName) return;

    statusMutation.mutate({
      itemId: Number(itemId),
      statusName,
    });
  };

  const onClickDelete = () => {
    setIsAlertOpen(true);
  };

  const deleteItem = () => {
    deleteMutation.mutate(Number(itemId));
    navigate('/');
  };

  return (
    <Container>
      <StyledHeader
        leftButton={
          <Button styledType="text" onClick={() => navigate('/')}>
            <Icon name="chevronLeft" color="neutralText" />
            뒤로
          </Button>
        }
        rightButton={
          itemDetailsData.isSeller ? (
            <div onMouseOver={hoverToFetch}>
              <Dropdown iconName="dots" align="right">
                <MenuItem onAction={openEditPanel}>게시글 수정</MenuItem>
                <MenuItem color="systemWarning" onAction={onClickDelete}>
                  삭제
                </MenuItem>
              </Dropdown>
            </div>
          ) : undefined
        }
      />

      <Main>
        <ImageSlider imageList={itemDetailsData.images} />
        <Body>
          <SellerInfo>
            <Button color="neutralBackgroundWeak" align="space-between">
              <InfoText>판매자 정보</InfoText>
              <span>{itemDetailsData.seller}</span>
            </Button>
          </SellerInfo>
          {itemDetailsData.isSeller && (
            <Status>
              <Dropdown
                btnText={
                  itemDetailsData.status.find(item => item.isSelected)?.name
                }
                iconName="chevronDown"
              >
                {itemDetailsData.status.map((state, index) => {
                  return (
                    <MenuItem
                      key={index}
                      isSelected={state.isSelected}
                      onAction={() => editStatus(state.name)}
                    >
                      {state.name}
                    </MenuItem>
                  );
                })}
              </Dropdown>
            </Status>
          )}
          <Content>
            <ContentHeader>
              <Title>{itemDetailsData.title}</Title>
              <SubInfo>
                <CategoryInfo>{itemDetailsData.categoryName}</CategoryInfo>
                <span>{getElapsedSince(itemDetailsData.createdAt)}</span>
              </SubInfo>
            </ContentHeader>
            <ContentBody>{itemDetailsData.content}</ContentBody>
            <CountData>
              <span>채팅 {itemDetailsData.countData.chat}</span>
              <span>관심 {itemDetailsData.countData.favorite}</span>
              <span>조회 {itemDetailsData.countData.view}</span>
            </CountData>
          </Content>
        </Body>
      </Main>

      <Footer>
        <FooterLeft>
          <IconButton styledType="text" onClick={toggleFavorites}>
            <Icon
              name="heart"
              color={
                itemDetailsData.isFavorite
                  ? 'systemWarning'
                  : 'neutralTextStrong'
              }
            />
          </IconButton>
          <Price>{setPrice(itemDetailsData.price)}</Price>
        </FooterLeft>
        <div>
          <Button size="M" color="accentPrimary" fontColor="accentText">
            {itemDetailsData.isSeller ? '대화 중인 채팅방' : ' 채팅하기'}
          </Button>
        </div>
      </Footer>
      {isAlertOpen && (
        <Alert
          isOpen={isAlertOpen}
          onClose={() => {
            setIsAlertOpen(false);
          }}
          onAction={deleteItem}
        >
          게시글을 삭제하시겠습니까?
        </Alert>
      )}
    </Container>
  );
}

const Wrapper = styled.div`
  flex: 1;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  background-color: ${({ theme }) => theme.color.neutralBackground};
`;

const StyledHeader = styled(Header)`
  background-color: transparent;
  border-bottom: none;

  &::before {
    backdrop-filter: none;
  }
`;

const Main = styled.div`
  height: 786px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;

const SellerInfo = styled.div`
  width: 361px;
`;

const InfoText = styled.span`
  font: ${({ theme }) => theme.font.displayDefault16};
`;

const Status = styled.div`
  width: 112px;
  border: 1px solid ${({ theme }) => theme.color.neutralBorder};
  border-radius: 8px;
  position: relative;

  button {
    width: 100%;
    height: 32px;
    padding: 0px 16px;
  }

  button > span {
    font: ${({ theme }) => theme.font.availableDefault12};
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`;

const ContentHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;

const Title = styled.span`
  font: ${({ theme }) => theme.font.displayStrong20};
  color: ${({ theme }) => theme.color.neutralTextStrong};
`;

const SubInfo = styled.div`
  display: flex;
  align-items: flex-start;
  align-self: stretch;
  font: ${({ theme }) => theme.font.displayDefault12};
  color: ${({ theme }) => theme.color.neutralTextWeak};
`;

const CategoryInfo = styled.span`
  &::after {
    content: '•';
    padding: 0 4px;
    font: ${({ theme }) => theme.font.displayDefault12};
    color: ${({ theme }) => theme.color.neutralTextWeak};
  }
`;

const ContentBody = styled.div`
  font: ${({ theme }) => theme.font.displayDefault16};
  color: ${({ theme }) => theme.color.neutralText};
`;

const CountData = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
  font: ${({ theme }) => theme.font.displayDefault12};
  color: ${({ theme }) => theme.color.neutralTextWeak};
`;

const Footer = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  border-top: ${({ theme }) => `0.8px solid ${theme.color.neutralBorder}`};
  position: absolute;
  bottom: 0;
  background-color: ${({ theme }) => theme.color.neutralBackgroundWeak};
`;

const FooterLeft = styled.div`
  display: flex;
  height: 32px;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`;

const IconButton = styled(Button)`
  padding: 0;
`;

const Price = styled.p`
  height: 28px;
  font: ${({ theme }) => theme.font.displayDefault16};
  color: ${({ theme }) => theme.color.neutralTextStrong};
`;
