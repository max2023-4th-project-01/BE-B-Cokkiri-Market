import {
  DialogHTMLAttributes,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { styled, keyframes } from 'styled-components';
import { Button } from './Button';

type ModalProps = DialogHTMLAttributes<HTMLDialogElement> & {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  headline?: string;
};

export default function Modal({
  open,
  onClose,
  headline,
  children,
}: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const hasHeadline = !!headline;
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
      <Container>
        <Header $hasHeadline={hasHeadline}>
          {hasHeadline ? (
            <Headline>{headline}</Headline>
          ) : (
            <Button type="ghost">뒤로</Button>
          )}
          <Button type="ghost" onClick={onClose}>
            <Plus>X</Plus>
          </Button>
        </Header>
        <Content>{children}</Content>
      </Container>
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
  background-color: ${({ theme }) => theme.color.neutralBackground};
  border-radius: 16px;
  border-width: 0;
  padding: 0;

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
  overflow-x: hidden;
`;

const Header = styled.header<{ $hasHeadline: boolean }>`
  min-height: 72px;
  display: flex;
  padding: 8px 8px 16px 24px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;

  ${({ $hasHeadline }) => !$hasHeadline && 'padding: 8px 8px 16px 12px;'}
`;

const Headline = styled.h2`
  font: ${({ theme }) => theme.font.displayStrong20};
`;

const Plus = styled.div`
  display: flex;
  width: 32px;
  height: 32px;
  padding: 12px;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
`;
