import { rest } from 'msw';
import { API_ENDPOINT } from '../api/endPoint';
import { fakeItems } from './faker';

export const mainHandlers = [
  rest.get(API_ENDPOINT.ITEMS, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(homeData));
  }),
];

const homeData = {
  userLocation: '역삼 1동',
  items: [
    {
      id: 1,
      title: '글제목',
      locationName: '역삼 1동',
      createdAt: new Date('2023-08-28T23:04:33'),
      statusName: '예약중',
      price: 10000,
      countData: {
        chat: 10,
        favorite: 10,
      },
      thumbnailUrl:
        'https://www.ikea.com/kr/ko/images/products/alex-storage-unit-white__1209817_pe909458_s5.jpg?f=xl',
      isSeller: true,
    },
    ...fakeItems(),
  ],
};
