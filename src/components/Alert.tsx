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
  border-width: 0;
  border-radius: 16px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const Content = styled.div``;

const Footer = styled.div``;

const Cancel = styled.div``;

const Delete = styled.div``;
