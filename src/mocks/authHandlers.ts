import { rest } from 'msw';

export const authHandlers = [
  rest.post('/api/login', (req, res, ctx) => {
    console.log(req.body);

    return res(ctx.status(200), ctx.json(user));
  }),
  rest.post('/api/signup', (req, res, ctx) => {
    console.log(req.body);

    return res(ctx.status(200), ctx.json('201'));
  }),
];

const user = {
  username: 'testUser',
  profileImageUrl: 'https://avatars.githubusercontent.com/u/41321198?v=4',
  accessToken: 'testAccessToken',
};
