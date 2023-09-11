import { styled } from 'styled-components';
import { Header } from '../../components/Header';
import { Button } from '../../components/button/Button';
import { Icon } from '../../components/icon/Icon';

export function ItemDetails() {
  return (
    <Container>
      <Header
        leftButton={
          <LeftAccessory>
            <Button styledType="text">뒤로</Button>
          </LeftAccessory>
        }
        rightButton={
          <RightAccessory>
            <Button styledType="text">
              <Icon name="dots" color="neutralTextStrong" />
            </Button>
          </RightAccessory>
        }
      />
      <Body>
        <ImageContainer>
          <Carousel />
        </ImageContainer>
        <SellorInfo />
        <ItemStatus />
        <ItemInfo>
          <ItemTitle />
          <ItemDetailsContent />
        </ItemInfo>
      </Body>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
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

const Body = styled.div``;
