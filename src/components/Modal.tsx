import {
  HTMLAttributes,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { styled, keyframes } from 'styled-components';

type ModalProps = HTMLAttributes<HTMLDialogElement> & {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ open, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  // Esc로 닫았을 때는 close 이벤트 감지해서 애니메이션 적용
  const onCancel: MouseEventHandler<HTMLDialogElement> = useCallback(
    event => {
      event.preventDefault();
      onClose();
    },
    [onClose]
  );

  // 모달 바깥 영역 클릭시 닫히도록
  const onClick: MouseEventHandler<HTMLDialogElement> = useCallback(
    ({ target }) => {
      const { current: el } = modalRef;
      if (target === el) {
        onClose();
      }
    },
    [onClose]
  );

  const onAnimEnd = useCallback(() => {
    const { current: el } = modalRef;
    if (el && !open) {
      el.close();
    }
  }, [open]);

  useEffect(() => {
    const { current: el } = modalRef;
    if (el && open) {
      el.showModal();
    }
  }, [open]);

  return (
    <Dialog
      className={open ? '' : 'modal--closing'}
      ref={modalRef}
      onClose={onClose}
      onCancel={onCancel}
      onClick={onClick}
      onAnimationEnd={onAnimEnd}
    >
      <Container>{children}</Container>
    </Dialog>
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

const hide = keyframes`
  from {
    opacity: 1;
    transform: translateY(0%);
  }
  to {
    opacity: 0;
    transform: translateY(min(100px, 5vh));
  }
`;

const Dialog = styled.dialog`
  position: relative;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: ${({ theme }) => theme.color.neutral.background};
  border-radius: 16px;
  border-width: 0;
  padding: 0;
  max-height: 80%;
  max-width: 80%;

  &[open] {
    animation: ${show} 250ms cubic-bezier(0.4, 0, 0.2, 1) forwards;

    &.modal--closing {
      animation: ${hide} 150ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
  }

  &::backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.color.neutral.overlay};
    animation: none;
  }
`;

const Container = styled.div`
  min-width: 320px;
  min-height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 1rem;
`;
