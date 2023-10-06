import { create } from 'zustand';

const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;

type screenConfigState = {
  screenWidth: number;
  screenHeight: number;
  screenRect: DOMRect | null;
  setScreenRect: (screenRect: DOMRect) => void;
  updateConfig: () => void;
};

export const useScreenConfigStore = create<screenConfigState>(set => ({
  screenWidth: BASE_WIDTH,
  screenHeight: BASE_HEIGHT,
  screenRect: null,
  setScreenRect: (screenRect: DOMRect) => {
    set(() => ({ screenRect }));
  },
  updateConfig: () => {
    const userAgent = navigator.userAgent;
    const isMobile =
      /Mobile|Android/i.test(userAgent) ||
      window.innerWidth <= 768 ||
      window.innerHeight <= BASE_HEIGHT;
    const screenWidth = isMobile ? window.innerWidth : BASE_WIDTH;
    const screenHeight = isMobile ? window.innerHeight : BASE_HEIGHT;

    set({ screenWidth, screenHeight });
  },
}));
