import { useState, useRef } from 'react';
import { useScreenConfigStore } from '../stores/useScreenConfigStore';

const FOOTER_HEIGHT = 64;
const DROPDOWN_MAX_HEIGHT = 230;

export const useGetDropdownDirection = () => {
  const [direction, setDirection] = useState<'up' | 'down'>('down');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const screenRect = useScreenConfigStore(state => state.screenRect);

  const getDirection = () => {
    if (!dropdownRef.current || !screenRect) return;

    const { bottom: dropdownRectBottom } =
      dropdownRef.current.getBoundingClientRect();

    if (
      screenRect.bottom - FOOTER_HEIGHT <
      dropdownRectBottom + DROPDOWN_MAX_HEIGHT
    ) {
      setDirection('up');
      return;
    }
    setDirection('down');
  };

  return { dropdownRef, direction, getDirection };
};
