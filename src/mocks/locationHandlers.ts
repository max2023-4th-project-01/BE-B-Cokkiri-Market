import { rest } from 'msw';
import { API_ENDPOINT } from '../api/endPoint';

export const locationHandlers = [
  rest.get(API_ENDPOINT.USER_LOCATION, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(userLocations));
  }),

  rest.get(API_ENDPOINT.LOCATION_DATA, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(locationData));
  }),

  rest.post(API_ENDPOINT.USER_LOCATION, (req, res, ctx) => {
    userLocations = {
      locations: [
        ...userLocations.locations,
        { id: 3, name: req.body?.name.split(' ').at(-1), isSelected: false },
      ],
    };
    return res(ctx.status(200), ctx.json({ message: '동네 추가 성공' }));
  }),

  rest.patch(`${API_ENDPOINT.USER_LOCATION}/:id`, (req, res, ctx) => {
    const { id } = req.params;
    userLocations = {
      locations: userLocations.locations.map(location => {
        return {
          ...location,
          isSelected: location.id === Number(id),
        };
      }),
    };
    return res(ctx.status(200), ctx.json({ message: '동네 선택 성공' }));
  }),

  rest.delete(`${API_ENDPOINT.USER_LOCATION}/:id`, (req, res, ctx) => {
    const { id } = req.params;
    userLocations = {
      locations: userLocations.locations.filter(
        location => location.id !== Number(id)
      ),
    };
    return res(ctx.status(200), ctx.json({ message: '동네 삭제 성공' }));
  }),
];

let userLocations = {
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

const locationData = [
  {
    id: 1,
    item: '서울특별시 송파구 가락동',
  },
  {
    id: 2,
    item: '서울특별시 송파구 가락로',
  },
  {
    id: 3,
    item: '서울특별시 성동구 가람길',
  },
  {
    id: 4,
    item: '서울특별시 양천구 가로공원로',
  },
  {
    id: 5,
    item: '서울특별시 구로구 가리봉동',
  },
  {
    id: 6,
    item: '서울특별시 금천구 가마산로',
  },
  {
    id: 7,
    item: '서울특별시 영등포구 가마산로',
  },
  {
    id: 8,
    item: '서울특별시 구로구 가마산로',
  },
  {
    id: 9,
    item: '서울특별시 금천구 가산동',
  },
  {
    id: 10,
    item: '서울특별시 금천구 가산로',
  },
  {
    id: 11,
    item: '서울특별시 마포구 가양대로',
  },
  {
    id: 12,
    item: '서울특별시 강서구 가양동',
  },
  {
    id: 13,
    item: '서울특별시 서대문구 가재울로',
  },
  {
    id: 14,
    item: '서울특별시 서대문구 가재울미래로',
  },
  {
    id: 15,
    item: '서울특별시 은평구 가좌로',
  },
  {
    id: 16,
    item: '서울특별시 서대문구 가좌로',
  },
  {
    id: 17,
    item: '서울특별시 종로구 가회동',
  },
  {
    id: 18,
    item: '서울특별시 서대문구 간호대로',
  },
  {
    id: 19,
    item: '서울특별시 용산구 갈월동',
  },
  {
    id: 20,
    item: '서울특별시 은평구 갈현동',
  },
];
