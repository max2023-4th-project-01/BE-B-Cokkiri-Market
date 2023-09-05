import { useRef } from 'react';

export const useScrollLock = (targetElId: string) => {
  const scroll = useRef(false);
  const targetEl: HTMLElement =
    document.getElementById(targetElId) ?? document.body;

  const preventScroll = (event: WheelEvent | TouchEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const lockScroll = () => {
    if (typeof document === 'undefined') return;
    if (!targetEl || !targetEl.style || scroll.current) return;

    targetEl.addEventListener('wheel', preventScroll, { passive: false });
    targetEl.addEventListener('touchmove', preventScroll, { passive: false });
    console.log('lockScroll');
    scroll.current = true;
  };

  const unlockScroll = () => {
    if (typeof document === 'undefined') return;
    if (!targetEl || !targetEl.style || !scroll.current) return;

    targetEl.removeEventListener('wheel', preventScroll);
    targetEl.removeEventListener('touchmove', preventScroll);
    console.log('unlockScroll');
    scroll.current = false;
  };

  return [lockScroll, unlockScroll];
};
