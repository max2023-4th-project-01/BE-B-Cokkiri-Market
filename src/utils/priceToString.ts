import { addCommasToNumber } from './addCommasToNumber';

export const priceToString = (price: number | null | undefined) => {
  switch (price) {
    case undefined:
      return;
    case null:
      return '가격 미정';
    case 0:
      return '나눔';
    default:
      return `${addCommasToNumber(price)}원`;
  }
};
