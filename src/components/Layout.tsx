import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';
import { useScreenConfigStore } from '../stores/useScreenConfigStore';
import { Footer } from './Footer';

export function Layout() {
  const { screenWidth, screenHeight } = useScreenConfigStore();
  return (
    <Wrapper $width={screenWidth} $height={screenHeight}>
      <Outlet />
      <Footer />
    </Wrapper>
  );
}

const Wrapper = styled.div<{ $width: number; $height: number }>`
  width: ${({ $width }) => `${$width}px`};
  height: ${({ $height }) => `${$height}px`};
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 0 auto;
  border: 1px solid ${({ theme }) => theme.color.neutralBorder};
  font: ${({ theme }) => theme.font.displayStrong20};
  color: ${({ theme }) => theme.color.neutralTextStrong};
  background-color: ${({ theme }) => theme.color.accentText};
  overflow: hidden;
`;
