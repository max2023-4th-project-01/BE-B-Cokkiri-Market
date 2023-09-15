import { keyframes, styled } from 'styled-components';
import { Button } from '../button/Button';

export function ItemDetailsSkeleton() {
  return (
    <Container>
      <Main>
        <SkeletonImageSlider />
        <Body>
          <SkeletonWrapper>
            <SellerInfo>
              <SkeletonButton
                color="neutralBackgroundWeak"
                align="space-between"
              >
                {' '}
              </SkeletonButton>
            </SellerInfo>
            <SkeletonHeader />
            <SkeletonBody />
            <SkeletonCountData />
            <ShimmerWrapper>
              <Shimmer />
            </ShimmerWrapper>
          </SkeletonWrapper>
        </Body>
      </Main>
      <Footer></Footer>
    </Container>
  );
}

const loading = keyframes`
  0% {
   transform: translateX(-150%);
  }
  50% {
   transform: translateX(-60%);
  }
  100% {
   transform: translateX(150%);
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  background-color: ${({ theme }) => theme.color.neutralBackground};
`;

const SkeletonImageSlider = styled.div`
  width: 100%;
  height: 491px;
  position: relative;
  background-color: ${({ theme }) => theme.color.neutralBorder};
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
  position: relative;
`;

const SellerInfo = styled.div`
  width: 361px;
`;

const SkeletonButton = styled(Button)`
  background-color: ${({ theme }) => theme.color.neutralBorder};
`;

const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`;

const SkeletonHeader = styled.div`
  width: 200px;
  height: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
  background-color: ${({ theme }) => theme.color.neutralBorder};
`;

const SkeletonBody = styled.div`
  width: 100%;
  height: 60px;
  font: ${({ theme }) => theme.font.displayDefault16};
  color: ${({ theme }) => theme.color.neutralText};
  background-color: ${({ theme }) => theme.color.neutralBorder};
`;

const SkeletonCountData = styled.div`
  height: 10px;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
  font: ${({ theme }) => theme.font.displayDefault12};
  color: ${({ theme }) => theme.color.neutralTextWeak};
  background-color: ${({ theme }) => theme.color.neutralBorder};
`;

const ShimmerWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Shimmer = styled.div`
  width: 50%;
  height: 100%;
  opacity: 0.2;
  background: ${({ theme }) => theme.color.neutralBackgroundBlur};
  transform: skewX(-20deg);
  animation: ${loading} 1s linear infinite;
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
