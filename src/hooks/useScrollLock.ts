import { useRef } from 'react';

export const useScrollLock = () => {
  const scroll = useRef(false);

  const lockScroll = () => {
    if (typeof document === 'undefined') return;

    const body: HTMLElement =
      document.querySelector('#items-body') ?? document.body;

    if (!body || !body.style || scroll.current) return;

    body.style.position = 'relative';
    body.style.overflow = 'hidden';
    scroll.current = true;
  };

  const unlockScroll = () => {
    if (typeof document === 'undefined') return;

    const body: HTMLElement =
      document.querySelector('#items-body') ?? document.body;

    if (!body || !body.style || !scroll.current) return;

    body.style.position = '';
    body.style.overflow = '';
    scroll.current = false;
  };

  return [lockScroll, unlockScroll];
};
