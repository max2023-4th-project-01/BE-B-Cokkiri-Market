import { rest } from 'msw';
import { API_ENDPOINT } from '../api/endPoint';

export const authHandlers = [
  rest.post(API_ENDPOINT.LOGIN, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(user));
  }),
  rest.post(API_ENDPOINT.SIGNUP, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json('201'));
  }),
];

const user = {
  username: 'testUser',
  profileImageUrl: 'https://avatars.githubusercontent.com/u/41321198?v=4',
  accessToken: 'testAccessToken',
};
