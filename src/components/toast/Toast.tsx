import { useState } from 'react';
import { keyframes, styled } from 'styled-components';
import {
  ToastMode,
  ToastType,
  useToastStore,
} from '../../stores/useToastStore';
import { Button } from '../button/Button';
import { Icon } from '../icon/Icon';
import { PositionType } from './ToastContainer';

type ToastState = 'appearing' | 'displayed' | 'disappearing';

export function Toast({
  toast,
  index,
  position,
}: {
  toast: ToastType;
  index: number;
  position: PositionType;
}) {
  const { baseDuration, hideToast } = useToastStore();
  const [toastState, setToastState] = useState<ToastState>('appearing');

  const onAnimationEnd = () => {
    if (toastState === 'disappearing') {
      hideToast(toast.id);
    } else if (toastState === 'appearing') {
      setToastState('displayed');
    }
  };

  const onAnimationEndProgress = () => {
    toastClose();
  };

  const toastClose = () => {
    setToastState('disappearing');
  };

  return (
    <ToastWrapper
      $position={position}
      $mode={toast.mode}
      $toastState={toastState}
      onAnimationEnd={onAnimationEnd}
      $index={index}
    >
      <Icon name={toast.mode} />
      {toast.message}
      <CloseButton styledType="text" size="S" onClick={toastClose}>
        <Icon name="x" size={20} />
      </CloseButton>
      <ProgressBar
        $duration={toast.duration || baseDuration}
        $mode={toast.mode}
        onAnimationEnd={onAnimationEndProgress}
      />
    </ToastWrapper>
  );
}

const calculatePositionValues = (position: PositionType) => {
  const baseValues = {
    bottom: [60, 105, 80],
    top: [-60, 45, 20],
  };

  const [startValue, middleValue, endValue] = baseValues[position];

  return {
    start: startValue,
    middle: middleValue,
    end: endValue,
  };
};

const generateSlide = (from: number, mid: number, to: number) => keyframes`
    0% { top: calc(${from}px); }
    85% { top: calc(${mid}px); }
    100% { top: calc(${to}px); }
  `;

const generateAnimationSlide = (
  toastState: ToastState,
  position: PositionType,
  index: number
) => {
  const { start, middle, end } = calculatePositionValues(position);

  if (toastState === 'disappearing') {
    return generateSlide(end + index * 80, middle + index * 80, start);
  } else {
    return generateSlide(start, middle, end);
  }
};

const ToastWrapper = styled.div<{
  $mode: ToastMode;
  $position: PositionType;
  $toastState: ToastState;
  $index: number;
}>`
  width: 90%;
  height: 60px;
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 20px;
  position: absolute;
  top: ${({ $index }) => 80 * $index}px;
  padding: 16px;
  margin: 0 auto;
  border-radius: 8px;
  border: none;
  background: ${({ $mode }) => typeToBackGroundColor($mode)};
  font: ${({ theme }) => theme.font.displayStrong16};

  animation: ${({ $toastState, $position, $index }) =>
      generateAnimationSlide($toastState, $position, $index)}
    0.5s ease-out;
`;

const CloseButton = styled(Button)`
  position: absolute;
  top: 3px;
  right: 5px;
  padding: 0;
`;

const reduceWidth = keyframes`
  from { width: 100%; }
  to { width: 0; }
`;

const ProgressBar = styled.div<{
  $duration: number;
  $mode: ToastMode;
}>`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: 100%;
  background-color: ${({ $mode }) => typeToBackProgressBarColor($mode)};
  animation: ${reduceWidth} linear ${({ $duration }) => $duration / 1000}s
    forwards;
`;

const typeToBackGroundColor = (type: ToastMode): string => {
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

const typeToBackProgressBarColor = (type: ToastMode): string => {
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
