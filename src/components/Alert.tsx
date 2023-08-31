import {
  useRef,
  useEffect,
  DialogHTMLAttributes,
  BaseSyntheticEvent,
} from 'react';
import { createPortal } from 'react-dom';
import { styled, keyframes } from 'styled-components';
import { Button } from './Button';

type AlertProps = DialogHTMLAttributes<HTMLDialogElement> & {
  isOpen: boolean;
  onClose: () => void;
  onAction: () => void;
  children: React.ReactNode;
};

export function Alert({ isOpen, onClose, onAction, children }: AlertProps) {
  const alertRef = useRef<HTMLDialogElement>(null);
  const rootElement = document.getElementById('modal-root');

  const onAlertClose = (event: BaseSyntheticEvent) => {
    const modal = alertRef.current;
    if (event.target === modal) onClose();
  };

  const onAlertConfirm = () => {
    onAction();
    onClose();
  };

  useEffect(() => {
    const alert = alertRef.current;
    isOpen && alert?.showModal();
  }, [isOpen]);

  if (!rootElement) return;

  return createPortal(
    <Dialog ref={alertRef} onClose={onAlertClose} onClick={onAlertClose}>
      <Container>
        <Content>{children}</Content>
        <Footer>
          <Button styledType="ghost" onClick={onClose}>
            <Cancel>취소</Cancel>
          </Button>
          <Button styledType="ghost" onClick={onAlertConfirm}>
            <Delete>확인</Delete>
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
  color: ${({ theme }) => theme.color.accentPrimary};
`;
