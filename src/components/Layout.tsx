import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';
import { ProductEditorPanel } from '../page/productEditor/ProductEditorPanel';
import { useProductEditorStore } from '../stores/useProductEditorStore';
import { useScreenConfigStore } from '../stores/useScreenConfigStore';
import { Footer } from './Footer';
import { ToastContainer } from './Toast';

export function Layout() {
  const { screenWidth, screenHeight } = useScreenConfigStore();
  const isOpenEditor = useProductEditorStore(state => state.isOpen);

  return (
    <Wrapper $width={screenWidth} $height={screenHeight}>
      <Outlet />
      <Footer />
      <ToastContainer />
      {isOpenEditor && <ProductEditorPanel />}
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
  margin: 0 auto;
  border: 1px solid ${({ theme }) => theme.color.neutralBorder};
  font: ${({ theme }) => theme.font.displayStrong20};
  color: ${({ theme }) => theme.color.neutralTextStrong};
  background-color: ${({ theme }) => theme.color.accentText};
  overflow: hidden;
`;
