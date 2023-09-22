import { useState, useRef } from 'react';
import { useScreenConfigStore } from '../stores/useScreenConfigStore';

const FooterHeight = 64;
const DropdownMaxHeight = 230;

export const useGetDropdownDirection = () => {
  const [direction, setDirection] = useState<'up' | 'down'>('down');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const screenRect = useScreenConfigStore(state => state.screenRect);

  const getDirection = () => {
    if (!dropdownRef.current || !screenRect) return;

    const { bottom: dropdownRectBottom } =
      dropdownRef.current.getBoundingClientRect();

    if (
      screenRect.bottom - FooterHeight <
      dropdownRectBottom + DropdownMaxHeight
    ) {
      setDirection('up');
      return;
    }
    setDirection('down');
  };

  return { dropdownRef, direction, getDirection };
};
