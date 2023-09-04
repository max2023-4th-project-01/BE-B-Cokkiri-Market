import {
  BaseSyntheticEvent,
  DialogHTMLAttributes,
  useEffect,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';
import { keyframes, styled } from 'styled-components';

type ModalProps = DialogHTMLAttributes<HTMLDialogElement> & {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  headline?: string;
};

export function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const rootElement = document.getElementById('modal-root');

  const onModalClose = (event: BaseSyntheticEvent) => {
    const modal = modalRef.current;
    if (event.target === modal) onClose();
  };

  useEffect(() => {
    const modal = modalRef.current;
    isOpen && modal?.showModal();
  }, [isOpen]);

  if (!rootElement) return;

  return createPortal(
    <Dialog ref={modalRef} onClose={onModalClose} onClick={onModalClose}>
      <Container>{children}</Container>
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
  overflow: hidden;

  &[open] {
    animation: ${show} 250ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  &::backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.color.neutralOverlay};
    animation: none;
  }
`;

const Container = styled.div`
  width: 320px;
  height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  @media (max-height: 750px) {
    height: 90vh;
  }
`;
