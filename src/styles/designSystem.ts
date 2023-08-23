import { decToHexOpacity } from '../utils/style';

export type ColorType = keyof typeof designSystem.color;

export const colors = {
  white: '#FFFFFF',
  grey50: '#FAFAFA',
  grey100: `#F9F9F9${decToHexOpacity(0.8)}`,
  grey200: `#F5F5F5${decToHexOpacity(0.7)}`,
  grey300: `#B3B3B3${decToHexOpacity(0.12)}`,
  grey400: `#EFEFF0`,
  grey500: `#B3B3B3${decToHexOpacity(0.39)}`,
  grey600: `#000000${decToHexOpacity(0.2)}`,
  grey700: `#3C3C43${decToHexOpacity(0.36)}`,
  grey800: `#3C3C43${decToHexOpacity(0.6)}`,
  grey900: '#3C3C43',
  black: '#000000',
  mint: '#00C7BE',
  orange: '#FF9500',
  red: '#FF3B30',
};

const font = {
  displayStrong20: '700 20px Noto Sans KR, sans-serif',
  displayStrong16: '700 16px Noto Sans KR, sans-serif',
  displayDefault16: '400 16px Noto Sans KR, sans-serif',
  displayDefault12: '400 12px Noto Sans KR, sans-serif',

  availableStrong16: '700 16px Noto Sans KR, sans-serif',
  availableStrong12: '700 12px Noto Sans KR, sans-serif',
  availableStrong10: '700 10px Noto Sans KR, sans-serif',
  availableDefault16: '400 16px Noto Sans KR, sans-serif',
  availableDefault12: '400 12px Noto Sans KR, sans-serif',

  enabledStrong16: '700 16px Noto Sans KR, sans-serif',
  enabledStrong12: '700 12px Noto Sans KR, sans-serif',
};

export const designSystem = {
  color: {
    neutralText: colors.grey900,
    neutralTextWeak: colors.grey800,
    neutralTextStrong: colors.black,
    neutralBackground: colors.white,
    neutralBackgroundWeak: colors.grey50,
    neutralBackgroundBold: colors.grey400,
    neutralBackgroundBlur: colors.grey100, // needs backdrop-filter: blur(8px);
    neutralBorder: colors.grey500,
    neutralBorderStrong: colors.grey700,
    neutralOverlay: colors.grey600,

    accentText: colors.white,
    accentTextWeak: colors.black,
    accentPrimary: colors.orange,
    accentSecondary: colors.mint,

    systemWarning: colors.red,
    systemBackground: colors.white,
    systemBackgroundWeak: colors.grey200,
  },
  filter: {
    neutralTextWeak:
      'brightness(0) saturate(100%) invert(15%) sepia(2%) saturate(5010%) hue-rotate(202deg) brightness(93%) contrast(73%)',
    accentText:
      'invert(100%) sepia(97%) saturate(15%) hue-rotate(110deg) brightness(103%) contrast(102%)',
  },
  backdropFilter: {
    blur: 'blur(8px)',
  },
  font,
};
