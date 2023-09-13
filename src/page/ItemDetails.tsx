import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { getItemDetails } from '../api/itemFetcher';
import { Header } from '../components/Header';
import { Button } from '../components/button/Button';
import { Dropdown } from '../components/dropdown/Dropdown';
import { MenuItem } from '../components/dropdown/MenuItem';
import { Icon } from '../components/icon/Icon';
import { ImageSlider } from '../components/itemDetails/ImageSlider';
import { getElapsedSince } from '../utils/getElapsedSince';

type ItemDetailsData = {
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
  const { itemId } = useParams();
  const { data, isLoading, isError } = useQuery<ItemDetailsData>(
    ['itemDetails', itemId],
    () => getItemDetails(Number(itemId))
  );
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

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (isError) {
    return <div>error...</div>;
  }

  return (
    <Container>
      <Header
        leftButton={
          <Button styledType="text" onClick={() => navigate('/')}>
            <Icon name="chevronLeft" color="neutralText" />
            뒤로
          </Button>
        }
        rightButton={
          <Dropdown iconName="dots" align="right">
            <MenuItem onAction={fakeAction}>게시글 수정</MenuItem>
            <MenuItem color="systemWarning" onAction={fakeAction}>
              삭제
            </MenuItem>
          </Dropdown>
        }
      />

      <Main>
        <ImageSlider imageList={data.images} />
        <Body>
          <SellorInfo>
            <Button color="neutralBackgroundWeak" align="space-between">
              <span>판매자 정보</span>
              <Name>{data.seller}</Name>
            </Button>
          </SellorInfo>
          <Status>
            <Dropdown
              btnText={data.status.find(item => item.isSelected)?.name || ''}
              iconName="chevronDown"
            >
              <MenuItem
                isSelected={data.status[0].isSelected}
                onAction={fakeAction}
              >
                판매중
              </MenuItem>
              <MenuItem
                isSelected={data.status[1].isSelected}
                onAction={fakeAction}
              >
                예약중
              </MenuItem>
              <MenuItem
                isSelected={data.status[2].isSelected}
                onAction={fakeAction}
              >
                판매완료
              </MenuItem>
            </Dropdown>
          </Status>
          <Content>
            <ContentHeader>
              <Title>{data.title}</Title>
              <SubInfo>
                <CategoryInfo>{data.categoryName}</CategoryInfo>
                <TimeStamp>{getElapsedSince(data.createdAt)}</TimeStamp>
              </SubInfo>
            </ContentHeader>
            <ContentBody>{data.content}</ContentBody>
            <ContentFooter>
              <ChatCount>채팅 {data.countData.chat}</ChatCount>
              <FavoritesCount>관심 {data.countData.favorite}</FavoritesCount>
              <ViewCount>조회 {data.countData.view}</ViewCount>
            </ContentFooter>
          </Content>
        </Body>
      </Main>

      <Footer>
        <FooterLeft>
          <IconButton styledType="text">
            <Icon name="heart" color="neutralTextStrong" />
          </IconButton>
          <Price>{setPrice(data.price)}</Price>
        </FooterLeft>
        <FooterRight>
          <Button size="M" color="accentPrimary" fontColor="accentText">
            대화 중인 채팅방
          </Button>
        </FooterRight>
      </Footer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: ${({ theme }) => theme.color.neutralBackground};
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

const SellorInfo = styled.div`
  width: 361px;

  span:first-child {
    font: ${({ theme }) => theme.font.displayDefault16};
  }
`;

const Name = styled.span``;

const Status = styled.div`
  width: 108px;
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

const TimeStamp = styled.span``;

const ContentBody = styled.div`
  font: ${({ theme }) => theme.font.displayDefault16};
  color: ${({ theme }) => theme.color.neutralText};
`;

const ContentFooter = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
  font: ${({ theme }) => theme.font.displayDefault12};
  color: ${({ theme }) => theme.color.neutralTextWeak};
`;

const ChatCount = styled.span``;

const FavoritesCount = styled.span``;

const ViewCount = styled.span``;

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

const FooterRight = styled.div``;
