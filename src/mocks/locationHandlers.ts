import { rest } from 'msw';

export const locationHandlers = [
  rest.get('/api/users/locations', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(locations));
  }),
];

const locations = {
  locations: [
    {
      id: 1,
      name: '역삼1동',
      isSelected: true,
    },
  ],
};
