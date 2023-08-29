import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';
import { Footer } from './Footer';

export function Layout() {
  return (
    <Wrapper>
      <Outlet />
      <Footer />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 393px;
  height: 852px;
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
