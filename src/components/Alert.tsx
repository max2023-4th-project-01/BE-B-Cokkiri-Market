import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { styled, keyframes } from 'styled-components';
import { Button } from './Button';

type AlertProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export function Alert({ isOpen, onClose, children }: AlertProps) {
  const alertRef = useRef<HTMLDialogElement>(null);
  const rootElement = document.getElementById('modal-root');

  useEffect(() => {
    const alert = alertRef.current;
    isOpen && alert?.showModal();
  }, [isOpen]);

  if (!rootElement) return;

  return createPortal(
    <Dialog
      ref={alertRef}
      onClose={event => {
        if (event.target !== alertRef.current) {
          return;
        }
        onClose();
      }}
    >
      <Container>
        <Content>{children}</Content>
        <Footer>
          <Button styledType="ghost">
            <Cancel onClick={onClose}>취소</Cancel>
          </Button>
          <Button styledType="ghost">
            <Delete>삭제</Delete>
          </Button>
        </Footer>
      </Container>
    </Dialog>,
    rootElement
  );
}

const show = keyframes`
  from {
    opacity: 0;
    transform: translateY(min(100px, 5vh));
  }
  to {
    opacity: 1;
    transform: translateY(0%);
  }
`;

const Dialog = styled.dialog`
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: ${({ theme }) => theme.color.neutralBackground};
  border-radius: 16px;
  border-width: 0;
  padding: 0;

  &[open] {
    animation: ${show} 250ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
`;

const Container = styled.div`
  display: flex;
  width: 336px;
  flex-direction: column;
  align-items: flex-start;
`;

const Content = styled.div`
  display: flex;
  padding: 24px 32px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  font: ${({ theme }) => theme.font.displayStrong16};
`;

const Footer = styled.div`
  display: flex;
  padding: 16px 32px;
  justify-content: flex-end;
  align-items: center;
  gap: 32px;
  align-self: stretch;
`;

const Cancel = styled.div`
  font: ${({ theme }) => theme.font.displayDefault16};
`;

const Delete = styled.div`
  font: ${({ theme }) => theme.font.displayStrong16};
  color: ${({ theme }) => theme.color.systemWarning};
`;
