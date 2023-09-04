import { createPortal } from 'react-dom';
import { styled } from 'styled-components';

export function Backdrop() {
  const rootElement = document.getElementById('modal-root');
  if (!rootElement) return null;
  return createPortal(<Dim></Dim>, rootElement);
}

const Dim = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.color.neutralOverlay};
`;
