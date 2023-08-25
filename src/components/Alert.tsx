import { useRef, useEffect, ReactEventHandler } from 'react';
import { styled } from 'styled-components';
import { Button } from './Button';

type AlertProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export function Alert({ isOpen, onClose, children }: AlertProps) {
  const alertRef = useRef<HTMLDialogElement>(null);

  const onCancel: ReactEventHandler<HTMLDialogElement> = event => {
    console.log('cancel event from alert');
    event.preventDefault;
  };

  useEffect(() => {
    const dialog = alertRef.current;
    isOpen && dialog?.showModal();
  }, [isOpen]);

  return (
    <Container ref={alertRef} onCancel={onCancel}>
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
  );
}

const Container = styled.dialog`
  display: flex;
  width: 336px;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  border-width: 0;
  border-radius: 16px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
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
