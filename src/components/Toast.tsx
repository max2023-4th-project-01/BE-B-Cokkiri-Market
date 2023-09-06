import { useEffect, useRef, useState } from 'react';
import { keyframes, styled } from 'styled-components';
import { useToastStore } from '../stores/useToastStore';
import { Button } from './button/Button';
import { Icon } from './icon/Icon';

type ToastType = 'success' | 'error';

export function ToastContainer() {
  const { toast, baseDuration, hideToast } = useToastStore();
  const [isExiting, setIsExiting] = useState(false);
  const [timerId, setTimerId] = useState<NodeJS.Timeout>();
  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!toast) return;

    const currentToast = toastRef.current;

    const handleAnimationEnd = (event: AnimationEvent) => {
      if (event.animationName === slideDownAndUp.name) {
        hideToast();
        setIsExiting(false);
      }
    };

    currentToast?.addEventListener('animationend', handleAnimationEnd);

    if (!isExiting) {
      const timer = setTimeout(() => {
        setIsExiting(true);
      }, toast.duration || baseDuration);

      setTimerId(timer);

      return () => {
        clearTimeout(timer);
      };
    }

    return () => {
      currentToast?.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [toast, isExiting, baseDuration, hideToast]);

  const handleClose = () => {
    setIsExiting(true);
    if (timerId) {
      clearTimeout(timerId);
      setTimerId(undefined);
    }
  };

  if (!toast) return null;

  return (
    <ToastWrapper $type={toast.type} $isExiting={isExiting} ref={toastRef}>
      <Icon name={toast.type} />
      {toast.message}
      <CloseButton styledType="text" size="S" onClick={handleClose}>
        <Icon name="x" size={20} />
      </CloseButton>
      <ProgressBar
        $duration={toast.duration || baseDuration}
        $type={toast.type}
      />
    </ToastWrapper>
  );
}

const slideUpAndDown = keyframes`
  0% { bottom: -60px; }
  85% { bottom: 45px; }
  100% { bottom: 20px; }
`;

const slideDownAndUp = keyframes`
  0% { bottom: 20px; }
  85% { bottom: 45px; }
  100% { bottom: -60px;}
`;

const reduceWidth = keyframes`
  from { width: 100%; }
  to { width: 0; }
`;

const ToastWrapper = styled.div<{
  $type: ToastType;
  $isExiting: boolean;
}>`
  width: 90%;
  height: 60px;
  position: absolute;
  bottom: 30px;
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 20px;
  padding: 16px;
  border-radius: 8px;
  font: ${({ theme }) => theme.font.enabledStrong16};
  background: ${({ $type }) => typeToBackGroundColor($type)};
  overflow: hidden;
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 -4px 6px rgba(0, 0, 0, 0.08);
  animation: ${({ $isExiting }) =>
      $isExiting ? slideDownAndUp : slideUpAndDown}
    0.5s ease-out;
`;

const CloseButton = styled(Button)`
  position: absolute;
  top: 3px;
  right: 5px;
  padding: 0;
`;

const ProgressBar = styled.div<{
  $duration: number;
  $type: ToastType;
}>`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: 100%;
  background-color: ${({ $type }) => typeToBackProgressBarColor($type)};
  animation: ${reduceWidth} linear ${({ $duration }) => $duration / 1000}s
    forwards;
`;

const typeToBackGroundColor = (type: ToastType): string => {
  return type === 'success' ? '#edf9e4' : '#fee2e2';
};

const typeToBackProgressBarColor = (type: ToastType): string => {
  return type === 'success' ? '#07bc0c' : '#e74c3c';
};
