import { rest } from 'msw';

export const handlers = [
  rest.get('/api/test', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json('hello'));
  }),
];
