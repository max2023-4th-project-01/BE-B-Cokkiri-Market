import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { getItemDetails } from '../api/itemFetcher';
import { Header } from '../components/Header';
import { Button } from '../components/button/Button';
import { Dropdown } from '../components/dropdown/Dropdown';
import { MenuItem } from '../components/dropdown/MenuItem';
import { Icon } from '../components/icon/Icon';
import { ImageSlider } from '../components/itemDetails/ImageSlider';

export function ItemDetails() {
  const { itemId } = useParams();
  const { data } = useQuery(
    ['itemDetails', itemId],
    () => {
      if (itemId) {
        return getItemDetails(Number(itemId));
      }
    },
    {
      enabled: !!itemId, // itemId가 정의되어 있을 때만 요청을 활성화
    }
  );

  const fakeAction = () => {
    console.log('dropdown menu clicked');
  };

  return (
    <Container>
      <Header
        leftButton={
          <Button styledType="text">
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
        <ImageSlider />
        <Body>
          <SellorInfo>
            <Button color="neutralBackgroundWeak" align="space-between">
              <span>판매자 정보</span>
              <Name>퓨즈아님</Name>
            </Button>
          </SellorInfo>
          <Status>
            <Dropdown btnText="판매중" iconName="chevronDown">
              <MenuItem onAction={fakeAction}>판매중</MenuItem>
              <MenuItem onAction={fakeAction}>예약중</MenuItem>
              <MenuItem onAction={fakeAction}>판매완료</MenuItem>
            </Dropdown>
          </Status>
          <Content>
            <ContentHeader>
              <Title>새학기 가방 팝니다</Title>
              <SubInfo>
                <CategoryInfo>남성패션/잡화</CategoryInfo>
                <TimeStamp>1분 전</TimeStamp>
              </SubInfo>
            </ContentHeader>
            <ContentBody>
              저번달에 새로 산 가방인데, 사용할 일이 많지 않아서 판매합니다.
              저번달에 새로 산 가방인데, 사용할 일이 많지 않아서 판매합니다.
              저번달에 새로 산 가방인데, 사용할 일이 많지 않아서 판매합니다.
              저번달에 새로 산 가방인데, 사용할 일이 많지 않아서 판매합니다.
              저번달에 새로 산 가방인데, 사용할 일이 많지 않아서 판매합니다.
              저번달에 새로 산 가방인데, 사용할 일이 많지 않아서 판매합니다.
            </ContentBody>
            <ContentFooter>
              <ChatCount>채팅 0</ChatCount>
              <FavoritesCount>관심 2</FavoritesCount>
              <ViewCount>조회 5</ViewCount>
            </ContentFooter>
          </Content>
        </Body>
      </Main>

      <Footer>
        <FooterLeft>
          <IconButton styledType="text">
            <Icon name="heart" color="neutralTextStrong" />
          </IconButton>
          <Price>99,000원</Price>
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
