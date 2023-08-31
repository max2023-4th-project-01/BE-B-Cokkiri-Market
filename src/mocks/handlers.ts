import { rest } from 'msw';
import { API_ENDPOINT } from '../api/endPoint';
import { authHandlers } from './authHandlers';
import { fakeCategories } from './faker';
import { locationHandlers } from './locationHandlers';
import { mainHandlers } from './mainHandlers';

export const handlers = [
  rest.get('/api/test', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json('hello'));
  }),
  rest.get(API_ENDPOINT.CATEGORIES, (_, res, ctx) => {
    const categories = fakeCategories();

    return res(ctx.status(200), ctx.json(categories));
  }),
  ...authHandlers,
  ...locationHandlers,
  ...mainHandlers,
];
