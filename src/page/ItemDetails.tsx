import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import {
  useGetItemDetails,
  usePatchFavorite,
  usePatchStatus,
} from '../api/queries/useItemDetailsQuery';
import { useDeleteItem } from '../api/queries/useItemQuery';
import { Alert } from '../components/Alert';
import { Error } from '../components/Error';
import { Header } from '../components/Header';
import { Button } from '../components/button/Button';
import { Dropdown } from '../components/dropdown/Dropdown';
import { MenuItem } from '../components/dropdown/MenuItem';
import { Icon } from '../components/icon/Icon';
import { ImageSlider } from '../components/itemDetails/ImageSlider';
import { getElapsedSince } from '../utils/getElapsedSince';

export type ItemDetailsData = {
  isSeller: boolean;
  images: { id: number; url: string }[];
  seller: string;
  status: { name: string; isSelected: boolean }[];
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
    data: itemDetailsData,
    isLoading,
    isError,
  } = useGetItemDetails(Number(itemId));
  const favoriteMutation = usePatchFavorite();
  const statusMutation = usePatchStatus();
  const deleteMutation = useDeleteItem();
  const navigate = useNavigate();

  const fakeAction = () => {
    console.log('dropdown menu clicked');
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

  // TODO: 페이지 로딩 시 스켈레톤 UI 추가 예정
  if (isLoading) {
    return <div>loading...</div>;
  }

  if (isError) {
    return <Error />;
  }

  const toggleFavorites = () => {
    favoriteMutation.mutate({
      itemId: Number(itemId),
      isFavorite: !itemDetailsData.isFavorite,
    });
  };

  const editStatus = (statusName: '판매중' | '예약중' | '판매완료') => {
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
            <Dropdown iconName="dots" align="right">
              <MenuItem onAction={fakeAction}>게시글 수정</MenuItem>
              <MenuItem color="systemWarning" onAction={onClickDelete}>
                삭제
              </MenuItem>
            </Dropdown>
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
                  itemDetailsData.status.find(item => item.isSelected)?.name ||
                  ''
                }
                iconName="chevronDown"
              >
                <MenuItem
                  isSelected={itemDetailsData.status[0].isSelected}
                  onAction={() => editStatus('판매중')}
                >
                  판매중
                </MenuItem>
                <MenuItem
                  isSelected={itemDetailsData.status[1].isSelected}
                  onAction={() => editStatus('예약중')}
                >
                  예약중
                </MenuItem>
                <MenuItem
                  isSelected={itemDetailsData.status[2].isSelected}
                  onAction={() => editStatus('판매완료')}
                >
                  판매완료
                </MenuItem>
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
            {itemDetailsData.isFavorite ? (
              <Icon name="heart" color="systemWarning" />
            ) : (
              <Icon name="heart" color="neutralTextStrong" />
            )}
          </IconButton>
          <Price>{setPrice(itemDetailsData.price)}</Price>
        </FooterLeft>
        <div>
          {itemDetailsData.isSeller ? (
            <Button size="M" color="accentPrimary" fontColor="accentText">
              대화 중인 채팅방
            </Button>
          ) : (
            <Button size="M" color="accentPrimary" fontColor="accentText">
              채팅하기
            </Button>
          )}
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
