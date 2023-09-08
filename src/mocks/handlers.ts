import { authHandlers } from './authHandlers';
import { locationHandlers } from './locationHandlers';
import { mainHandlers } from './mainHandlers';

export const handlers = [...authHandlers, ...locationHandlers, ...mainHandlers];
