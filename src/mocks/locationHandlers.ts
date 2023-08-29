import { rest } from 'msw';

export const locationHandlers = [
  rest.get('/api/users/locations', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(locations));
  }),
  rest.patch('/api/users/locations/:id', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: '동네 선택 성공' }));
  }),
  rest.delete('/api/users/locations/:id', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: '동네 삭제 성공' }));
  }),
];

const locations = {
  locations: [
    {
      id: 1,
      name: '역삼1동',
      isSelected: true,
    },
    {
      id: 2,
      name: '역삼2동',
      isSelected: false,
    },
  ],
};
