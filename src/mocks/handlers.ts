import { authHandlers } from './authHandlers';
import { itemDetailsHandlers } from './itemDetailsHandlers';
import { itemsHandlers } from './itemsHandlers';
import { locationHandlers } from './locationHandlers';

export const handlers = [
  ...authHandlers,
  ...locationHandlers,
  ...itemsHandlers,
  ...itemDetailsHandlers,
];
