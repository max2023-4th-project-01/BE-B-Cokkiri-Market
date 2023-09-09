import { authHandlers } from './authHandlers';
import { itemsHandlers } from './itemsHandlers';
import { locationHandlers } from './locationHandlers';

export const handlers = [
  ...authHandlers,
  ...locationHandlers,
  ...itemsHandlers,
];
