import { useEffect, useRef, useState } from 'react';
import { keyframes, styled } from 'styled-components';
import { useScreenConfigStore } from '../stores/useScreenConfigStore';
import { useToastStore } from '../stores/useToastStore';
import { Button } from './button/Button';
import { Icon } from './icon/Icon';

type ToastType = 'success' | 'error' | 'warning';

type PositionType = 'top' | 'bottom';

type ToastProps = {
  position?: PositionType;
  positionGap?: number;
};

export function ToastContainer({
  position = 'top',
  positionGap = 0,
}: ToastProps) {
  const { toast, baseDuration, hideToast } = useToastStore();
  const { screenWidth } = useScreenConfigStore();
  const [isExiting, setIsExiting] = useState(false);
  const [timerId, setTimerId] = useState<NodeJS.Timeout>();
  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!toast) return;

    const handleAnimationEnd = (event: AnimationEvent) => {
      if (
        event.animationName ===
        generateSlideDownAndUp(position, positionGap).name
      ) {
        hideToast();
        setIsExiting(false);
      }
    };

    const currentToast = toastRef.current;
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
  }, [toast, isExiting, baseDuration, position, positionGap, hideToast]);

  const handleClose = () => {
    setIsExiting(true);
    if (timerId) {
      clearTimeout(timerId);
      setTimerId(undefined);
    }
  };

  if (!toast) return null;

  return (
    <ToastWrapper
      onClick={e => e.stopPropagation()}
      $width={screenWidth}
      $type={toast.type}
      $isExiting={isExiting}
      ref={toastRef}
      $positionGap={positionGap}
      $position={position}
    >
      <div></div>
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

const calculatePositionValues = (
  position: PositionType,
  positionGap: number
) => {
  if (position === 'bottom') {
    return {
      start: `calc(100% + ${60 + positionGap}px)`,
      middle: `calc(100% - ${105 + positionGap}px)`,
      end: `calc(100% - ${80 + positionGap}px)`,
    };
  } else {
    return {
      start: `calc(-${60 + positionGap}px)`,
      middle: `calc(${45 + positionGap}px)`,
      end: `calc(${20 + positionGap}px)`,
    };
  }
};

const generateSlideUpAndDown = (
  position: PositionType,
  positionGap: number
) => {
  const { start, middle, end } = calculatePositionValues(position, positionGap);
  return keyframes`
    0% { top: ${start}; }
    85% { top: ${middle}; }
    100% { top: ${end}; }
  `;
};

const generateSlideDownAndUp = (
  position: PositionType,
  positionGap: number
) => {
  const { start, middle, end } = calculatePositionValues(position, positionGap);
  return keyframes`
    0% { top: ${end}; }
    85% { top: ${middle}; }
    100% { top: ${start}; }
  `;
};

const reduceWidth = keyframes`
  from { width: 100%; }
  to { width: 0; }
`;

const ToastWrapper = styled.div<{
  $width: number;
  $type: ToastType;
  $isExiting: boolean;
  $positionGap: number;
  $position: PositionType;
}>`
  width: calc(${({ $width }) => $width} * 0.9px);
  height: 60px;
  position: absolute;
  display: flex;
  justify-content: left;
  align-items: center;
  top: ${({ $position, $positionGap }) =>
    calculatePositionValues($position, $positionGap).end};
  gap: 20px;
  padding: 16px;
  margin: 0 auto;
  border-radius: 8px;
  border: none;
  font: ${({ theme }) => theme.font.enabledStrong16};
  background: ${({ $type }) => typeToBackGroundColor($type)};
  overflow: hidden;
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 -4px 6px rgba(0, 0, 0, 0.08);
  animation: ${({ $isExiting, $position, $positionGap }) =>
      $isExiting
        ? generateSlideDownAndUp($position, $positionGap)
        : generateSlideUpAndDown($position, $positionGap)}
    0.5s ease-out;
  &::backdrop {
    display: none;
    pointer-events: none;
  }
  z-index: 9999;
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
  switch (type) {
    case 'success': {
      return '#edf9e4';
    }
    case 'error': {
      return '#fee2e2';
    }
    case 'warning': {
      return '#fefee2';
    }
  }
};

const typeToBackProgressBarColor = (type: ToastType): string => {
  switch (type) {
    case 'success': {
      return '#07bc0c';
    }
    case 'error': {
      return '#e74c3c';
    }
    case 'warning': {
      return '#f0eb5c';
    }
  }
};
