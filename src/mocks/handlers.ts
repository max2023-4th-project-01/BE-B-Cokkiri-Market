import { rest } from 'msw';
import { authHandlers } from './authHandlers';
import { locationHandlers } from './locationHandlers';
import { mainHandlers } from './mainHandlers';

export const handlers = [
  rest.get('/api/test', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json('hello'));
  }),
  ...authHandlers,
  ...locationHandlers,
  ...mainHandlers,
];
