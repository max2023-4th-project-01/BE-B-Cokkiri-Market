export const COMMON_REGEX = /^[A-Za-z0-9]{6,20}$/;
export const NICKNAME_REGEX = /^(?=.*[가-힣A-Za-z0-9])[가-힣A-Za-z0-9]{2,16}$/;

const REGEX_MAP = {
  common: COMMON_REGEX,
  nickname: NICKNAME_REGEX,
};

export const isValid = (value: string, type: 'common' | 'nickname') => {
  return REGEX_MAP[type].test(value);
};
