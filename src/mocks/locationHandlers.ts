import { rest } from 'msw';

let locationsData = {
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

export const locationHandlers = [
  rest.get('/api/users/locations', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(locationsData));
  }),

  rest.patch('/api/users/locations/:id', (req, res, ctx) => {
    const { id } = req.params;
    locationsData = {
      locations: locationsData.locations.map(location => {
        return {
          ...location,
          isSelected: location.id === Number(id),
        };
      }),
    };
    return res(ctx.status(200), ctx.json({ message: '동네 선택 성공' }));
  }),

  rest.delete('/api/users/locations/:id', (req, res, ctx) => {
    const { id } = req.params;
    locationsData = {
      locations: locationsData.locations.filter(
        location => location.id !== Number(id)
      ),
    };
    return res(ctx.status(200), ctx.json({ message: '동네 삭제 성공' }));
  }),
];
