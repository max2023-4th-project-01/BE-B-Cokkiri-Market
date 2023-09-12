import { styled } from 'styled-components';
import backpackImg from '../assets/image/backpack.jpeg';
import { Header } from '../components/Header';
import { Button } from '../components/button/Button';
import { Icon } from '../components/icon/Icon';

export function ItemDetails() {
  return (
    <Container>
      <Header
        leftButton={<Button styledType="text">뒤로</Button>}
        rightButton={
          <Button styledType="text">
            <Icon name="dots" color="neutralTextStrong" />
          </Button>
        }
      />
      <Body>
        <ImageSlider>
          <img src={backpackImg} alt="상품 이미지" />
        </ImageSlider>
        <div>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad
          praesentium error distinctio veniam beatae voluptatem corrupti aperiam
          nulla? Quidem obcaecati non est iste, voluptate ipsa officia esse
          deserunt animi quod. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Aperiam saepe, suscipit odio, deleniti quod
          architecto tempore facere expedita eos veniam veritatis quisquam
          distinctio vel adipisci perferendis, sequi dolores repudiandae
          molestias. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Aperiam saepe, suscipit odio, deleniti quod architecto tempore facere
          expedita eos veniam veritatis quisquam distinctio vel adipisci
          perferendis, sequi dolores repudiandae molestias.
        </div>
      </Body>
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

// const StyledHeader = styled(Header)`
//   border-bottom: none;
//   background-color: transparent;

//   &::before {
//     content: '';
//     position: absolute;
//     width: 100%;
//     height: 100%;
//     z-index: -1;
//     backdrop-filter: none;
//   }
// `;

const Body = styled.div`
  height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const ImageSlider = styled.div`
  width: 100%;
  height: 491px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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

const FooterRight = styled.div``;
