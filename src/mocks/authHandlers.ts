import { rest } from 'msw';
import { API_ENDPOINT } from '../api/endPoint';

export const authHandlers = [
  rest.post(API_ENDPOINT.LOGIN, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(user),
      ctx.set('Authorization', 'Bearer testAccessToken'),
      ctx.set('Refresh-Token', 'Bearer testRefreshToken')
    );
  }),
  rest.post(API_ENDPOINT.SIGNUP, (_, res, ctx) => {
    return res(ctx.status(201), ctx.json('201'));
  }),
  rest.patch(API_ENDPOINT.CHANGE_PROFILE_IMAGE, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        profileImageUrl: 'https://avatars.githubusercontent.com/u/97204689?v=4',
      })
    );
  }),
];

const user = {
  nickname: 'testUser',
  profileImageUrl: 'https://avatars.githubusercontent.com/u/41321198?v=4',
};
