import { useCallback, useRef } from 'react';

export const useScrollLock = () => {
  const scroll = useRef(false);
  const body: HTMLElement =
    document.querySelector('#items-body') ?? document.body;

  const preventScroll = useCallback((event: WheelEvent | TouchEvent) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const lockScroll = () => {
    if (typeof document === 'undefined') return;

    if (!body || !body.style || scroll.current) return;

    body.addEventListener('wheel', preventScroll);
    body.addEventListener('touchmove', preventScroll);
    console.log('lockScroll');
    scroll.current = true;
  };

  const unlockScroll = () => {
    if (typeof document === 'undefined') return;

    const body: HTMLElement =
      document.querySelector('#items-body') ?? document.body;

    if (!body || !body.style || !scroll.current) return;

    body.removeEventListener('wheel', preventScroll);
    body.removeEventListener('touchmove', preventScroll);
    console.log('unlockScroll');
    scroll.current = false;
  };

  return [lockScroll, unlockScroll];
};
