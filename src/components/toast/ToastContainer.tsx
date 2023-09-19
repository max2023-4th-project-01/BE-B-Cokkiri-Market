import { styled } from 'styled-components';
import { useToastStore } from '../../stores/useToastStore';
import { Toast } from './Toast';

export type PositionType = 'top' | 'bottom';

export function ToastContainer({
  position = 'top',
}: {
  position?: PositionType;
}) {
  const { toasts } = useToastStore();
  return (
    <Container>
      {toasts.map((toast, index) => (
        <Toast
          key={toast.id}
          toast={toast}
          index={toasts.length - index - 1}
          position={position}
        />
      ))}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 20px;
  z-index: 9999;
`;
