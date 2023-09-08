import { useRef } from 'react';

export const useScrollLock = (targetElId: string) => {
  const scroll = useRef(false);
  const targetEl: HTMLElement =
    document.getElementById(targetElId) ?? document.body;
  const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

  const preventScroll = (event: WheelEvent | TouchEvent) => {
    event.preventDefault();
  };

  const preventKeydownScroll = (event: KeyboardEvent) => {
    if (keys.includes(event.key)) {
      event.preventDefault();
      return false;
    }
  };

  const lockScroll = () => {
    if (typeof document === 'undefined') return;
    if (!targetEl || !targetEl.style || scroll.current) return;

    targetEl.addEventListener('wheel', preventScroll, { passive: false });
    targetEl.addEventListener('touchmove', preventScroll, { passive: false });
    targetEl.addEventListener('keydown', preventKeydownScroll);

    scroll.current = true;
  };

  const unlockScroll = () => {
    if (typeof document === 'undefined') return;
    if (!targetEl || !targetEl.style || !scroll.current) return;

    targetEl.removeEventListener('wheel', preventScroll);
    targetEl.removeEventListener('touchmove', preventScroll);
    targetEl.removeEventListener('keydown', preventKeydownScroll);

    scroll.current = false;
  };

  return [lockScroll, unlockScroll];
};
